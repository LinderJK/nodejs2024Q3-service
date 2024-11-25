import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const excludedRoutes = [
      '/auth/login',
      '/auth/refresh',
      '/auth/signup',
      '/doc',
      '/',
    ];
    const path = request.url;
    console.log('Request path:', path);
    if (excludedRoutes.some((route) => path === route)) {
      return true;
    }
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
