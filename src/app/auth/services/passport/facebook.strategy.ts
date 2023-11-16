import { Metadata, StateStoreVerifyCallback, StateStoreStoreCallback } from 'passport-oauth2';
import { AuthProviderEnum } from '../../../../shared';
import { AuthService } from '../../../../application-generic/services';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import * as facebookPassport from 'passport-facebook-token';
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.API_ROOT_URL + '/auth/facebook/callback',
      // scope: ['user:email'],
      scope: ['email', 'profile'],
      passReqToCallback: true,
      store: {
        verify(req, state: string, meta: Metadata, callback: StateStoreVerifyCallback) {
          callback(null as any, true, JSON.stringify(req.query));
        },
        store(req, meta: Metadata, callback: StateStoreStoreCallback) {
          callback(null, JSON.stringify(req.query));
        },
      },
    });
  }

  async validate(req, accessToken: string, refreshToken: string, facebookProfile, done: (err, data) => void) {
    try {
      const profile = { ...facebookProfile._json, email: facebookProfile.emails[0].value };
      const parsedState = this.parseState(req);

      const response = await this.authService.authenticate(
        AuthProviderEnum.FACEBOOK,
        accessToken,
        refreshToken,
        profile,
        parsedState?.distinctId,
        // parsedState?.source,
      );

      done(null, {
        token: response.token,
        newUser: response.newUser,
      });
    } catch (err) {
      done(err, false);
    }
  }

  private parseState(req) {
    try {
      return JSON.parse(req.query.state);
    } catch (e) {
      return {};
    }
  }
}
