import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from '../../../shared';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Nếu không có đánh dấu roles, cho phép truy cập
    }

    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) return false;

    const token = request.headers.authorization.split(' ')[1];
    if (!token) return false;

    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader?.includes('ApiKey')) {
      const user = jwt.decode(token) as IJwtPayload;
      if (!user) return false;
    }

    // if (!authorizationHeader?.includes('ApiKey')) {
    //   const user = jwt.decode(token) as IJwtPayload;

    //   const userRoles = user.roles as string[];

    //   if (!userRoles || !roles.some((role) => userRoles.includes(role))) {
    //     return false;
    //   }

    //   // if (!user || !user.roles || !user.roles.some((role) => roles.includes(role))) {
    //   //   return false;
    //   // }
    // }

    return true;
  }
}
