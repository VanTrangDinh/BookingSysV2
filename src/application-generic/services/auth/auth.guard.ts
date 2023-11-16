import { AuthService } from './auth.service';
import { ExecutionContext, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly reflector: Reflector;
  constructor(@Inject(forwardRef(() => AuthService)) private authService: AuthService) {
    super();
    this.reflector = new Reflector();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (authorizationHeader && authorizationHeader.includes('ApiKey')) {
      const apiEnabled = this.reflector.get<boolean>('external_api_accessible', context.getHandler());
      if (!apiEnabled) throw new UnauthorizedException('API endpoint not available');

      const key = authorizationHeader.split(' ')[1];

      console.log({ key });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return this.authService.apiKeyAuthenticate(key).then<any>((result) => {
        request.headers.authorization = `Bearer ${result}`;

        return true;
      });
    }

    return super.canActivate(context);
  }
}
