import { AuthService } from '../../../../application-generic/services/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IJwtPayload } from '../../../../shared';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // @Instrument()
  async validate(payload: IJwtPayload) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }

    return payload;
  }
}
