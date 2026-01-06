import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { jwtConfig } from '@/config';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.header('authorization') || '';
    const response: Response = context.switchToHttp().getResponse();
    const jwt = jwtConfig();

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      const info = this.jwtService.verify<{
        user: {
          id: string;
          username: string;
        };
      }>(authorization);
      console.log('info', info);

      response.setHeader(
        'token',
        this.jwtService.sign(
          {
            user: info.user,
          },
          {
            expiresIn: jwt.expiresIn,
          },
        ),
      );
      return true;
    } catch (e) {
      throw new UnauthorizedException('用户未登录', e);
    }
  }
}
