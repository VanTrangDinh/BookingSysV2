import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EnvironmentEntity, EnvironmentRepository, IApiKey, UserEntity, UserRepository } from '../../../dal';

import { JwtService } from '@nestjs/jwt';
import { PinoLogger } from '../../logging';
import { AuthProviderEnum, IJwtPayload } from '../../../shared';
import { normalizeEmail } from '../../../app/shared/helpers/email-normalization.service';
import { CreateUser, CreateUserCommand } from '../../usecases/create-user';
import { ApiException } from '../../../app/shared/exceptions/api.exception';
import { CachedEntity, buildAuthServiceKey, buildUserKey } from '../cache';
import { CryptoRepository } from '../../../dal/infra/repositories';
import { UserTokenRepository } from '../../../dal/infra/repositories/user-token.repository';

export interface LoginDetails {
  isSecure: boolean;
  clientIp: string;
  deviceType: string;
  deviceOS: string;
}

export enum AuthType {
  PASSWORD = 'password',
  OAUTH = 'oauth',
}

@Injectable()
export class AuthService {
  constructor(
    // private logger: PinoLogger,
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private createUserUsecase: CreateUser,
    private environmentRepository: EnvironmentRepository,
  ) {}

  async authenticate(
    authProvider: AuthProviderEnum,
    accessToken: string,
    refreshToken: string,
    profile: {
      name: string;
      login: string;
      email: string;
      avatar_url: string;
      id: string;
    },
    distinctId: string,
    // origin?: SignUpOriginEnum,
  ) {
    const email = normalizeEmail(profile.email);
    let user = await this.userRepository.findByEmail(email);

    let newUser = false;

    if (!user) {
      const firstName = profile.name ? profile.name.split(' ').slice(0, -1).join(' ') : profile.login;
      const lastName = profile.name ? profile.name.split(' ').slice(-1).join(' ') : null;

      user = await this.createUserUsecase.execute(
        CreateUserCommand.create({
          picture: profile.avatar_url,
          email,
          firstName,
          lastName,
          auth: {
            username: profile.login,
            profileId: profile.id,
            provider: authProvider,
            accessToken,
            refreshToken,
          },
        }),
      );

      newUser = true;
    } else {
      if (authProvider === AuthProviderEnum.GITHUB || authProvider === AuthProviderEnum.GOOGLE) {
        user = await this.updateUserUsername(user, profile, authProvider);
      }
    }

    return {
      newUser,
      token: await this.generateUserToken(user),
    };
  }

  private async updateUserUsername(
    user: UserEntity,
    profile: {
      name: string;
      login: string;
      email: string;
      avatar_url: string;
      id: string;
    },
    authProvider: AuthProviderEnum,
  ) {
    const withoutUsername = user.tokens.find(
      (token) => token.provider === authProvider && !token.username && String(token.providerId) === String(profile.id),
    );

    if (withoutUsername) {
      await this.userRepository.update(
        {
          _id: user._id,
          'tokens.providerId': profile.id,
        },
        {
          $set: {
            'tokens.$.username': profile.login,
          },
        },
      );

      const updateUser = await this.userRepository.findById(user._id);
      if (!updateUser) throw new ApiException('User not found');
    }

    return user;
  }

  async generateUserToken(user: UserEntity) {
    return this.getSignedToken(user);
  }

  async getSignedToken(user: UserEntity, organizationId?: string): Promise<string> {
    return this.jwtService.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      {
        expiresIn: '30 days',
        issuer: 'airbnb_api ',
      },
    );
  }

  async verifyJwt(token: string) {
    try {
      const signedJwt = this.jwtService.verify(token);
      return signedJwt;
    } catch (err) {
      return null;
    }
  }

  async refreshToken(userId: string) {
    const user = await this.getUser({ _id: userId });
    if (!user) throw new UnauthorizedException('User not found');

    return this.getSignedToken(user);
  }

  // @Instrument()
  // async isAuthenticatedForOrganization(userId: string, organizationId: string): Promise<boolean> {
  //   return !!(await this.memberRepository.isMemberOfOrganization(organizationId, userId));
  // }

  // @Instrument()
  async validateUser(payload: IJwtPayload): Promise<UserEntity> {
    // We run these in parallel to speed up the query time
    const userPromise = this.getUser({ _id: payload._id });

    // const isMemberPromise = payload.organizationId
    //   ? this.isAuthenticatedForOrganization(payload._id, payload.organizationId)
    //   : Promise.resolve(true);
    const [user] = await Promise.all([userPromise]);

    if (!user) throw new UnauthorizedException('User not found');
    if (payload.organizationId) {
      throw new UnauthorizedException(`No authorized for organization ${payload.organizationId}`);
    }

    return user;
  }

  //@Instrument()
  async apiKeyAuthenticate(apiKey: string) {
    const { environment, user, key, error } = await this.getUserData({
      apiKey,
    });

    if (error) throw new UnauthorizedException(error);
    if (!environment) throw new UnauthorizedException('API Key not found');
    if (!user) throw new UnauthorizedException('User not found');

    if (!key) throw new UnauthorizedException('API Key not found');

    return await this.getApiSignedToken(user, environment._organizationId, environment._id, key.key);
  }

  async getApiSignedToken(
    user: UserEntity,
    organizationId: string,
    environmentId: string,
    apiKey: string,
  ): Promise<string> {
    return this.jwtService.sign(
      {
        _id: user._id,
        firstName: 'API Request',
        lastName: null,
        email: user.email,
        profilePicture: null,
        organizationId,
        // roles: [MemberRoleEnum.ADMIN],
        apiKey,
        environmentId,
      },
      {
        expiresIn: '1 day',
        issuer: 'novu_api',
        audience: 'api_token',
      },
    );
  }

  // @Instrument()
  @CachedEntity({
    builder: (command: { _id: string }) =>
      buildUserKey({
        _id: command._id,
      }),
  })
  private async getUser({ _id }: { _id: string }) {
    return await this.userRepository.findById(_id);
  }

  @CachedEntity({
    builder: ({ apiKey }: { apiKey: string }) =>
      buildAuthServiceKey({
        apiKey: apiKey,
      }),
  })
  private async getUserData({ apiKey }: { apiKey: string }): Promise<{
    environment?: EnvironmentEntity;
    user?: UserEntity;
    key?: IApiKey;
    error?: string;
  }> {
    const environment = await this.environmentRepository.findByApiKey(apiKey);
    if (!environment) {
      return { error: 'API Key not found' };
    }

    const key = environment.apiKeys.find((i) => i.key === apiKey);
    if (!key) {
      return { error: 'API Key not found' };
    }

    const user = await this.userRepository.findById(key._userId);
    if (!user) {
      return { error: 'User not found' };
    }

    return { environment, user, key };
  }
}
