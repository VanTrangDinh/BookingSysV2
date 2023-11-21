import { MiddlewareConsumer, Module, NestModule, Provider, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import * as passport from 'passport';
import { AuthController } from './auth.controller';

import { USE_CASES } from './usecases';
import { SharedModule } from '../shared/shared.module';
import { AuthService, CreateUser } from '../../application-generic';
import { JwtModule } from '@nestjs/jwt';
import { OrganizationModule } from '../organization/organization.module';
import { AuthProviderEnum } from '../../shared';
import { EnvironmentConfigModule } from '../../config/configEnv.module';
import { FacebookStrategy, GitHubStrategy, GoogleStrategy, JwtStrategy } from './services/passport';
import { JwtAuthGuard } from './framework/auth.guard';
import { RolesGuard } from './framework/roles.guard';

const oauthProviders = [
  { envVar: 'GITHUB_OAUTH_CLIENT_ID', strategy: GitHubStrategy },
  { envVar: 'GOOGLE_OAUTH_CLIENT_ID', strategy: GoogleStrategy },
  { envVar: 'FACEBOOK_OAUTH_CLIENT_ID', strategy: FacebookStrategy },
];

const AUTH_STRATEGIES: Provider[] = oauthProviders
  .filter((provider) => !!process.env[provider.envVar])
  .map((provider) => provider.strategy);

@Module({
  imports: [
    OrganizationModule,
    SharedModule,
    EnvironmentConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secretOrKeyProvider: () => process.env.JWT_SECRET as string,
      signOptions: {
        expiresIn: 360000,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard, CreateUser, JwtStrategy, JwtAuthGuard, ...AUTH_STRATEGIES, ...USE_CASES],
  exports: [AuthService, RolesGuard, CreateUser, JwtAuthGuard, ...USE_CASES],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    if (process.env.GITHUB_OAUTH_CLIENT_ID) {
      consumer
        .apply(
          passport.authenticate(AuthProviderEnum.GITHUB, {
            session: false,
            scope: ['user:email'],
            failureRedirect: '/error',
          }),
        )
        .forRoutes({
          path: '/v1/auth/github',
          method: RequestMethod.GET,
        });
    }
    if (process.env.GOOGLE_OAUTH_CLIENT_ID) {
      consumer
        .apply(
          passport.authenticate(AuthProviderEnum.GOOGLE, {
            session: false,
            scope: ['user:email'],
          }),
        )
        .forRoutes({
          path: '/v1/auth/google',
          method: RequestMethod.GET,
        });
    }
    if (process.env.FACEBOOK_OAUTH_CLIENT_ID) {
      consumer
        .apply(
          passport.authenticate(AuthProviderEnum.FACEBOOK, {
            session: false,
            scope: ['user:email'],
          }),
        )
        .forRoutes({
          path: '/v1/auth/facebook',
          method: RequestMethod.GET,
        });
    }
  }
}
