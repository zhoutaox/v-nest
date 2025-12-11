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

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    console.log(request.header('authorization'));

    const authorization = request.header('authorization') || '';
    const response: Response = context.switchToHttp().getResponse();

    if (!authorization) {
      throw new UnauthorizedException('登录 token 错误');
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
            expiresIn: '1d',
          },
        ),
      );

      //   (request as any).user = info.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('登录 token 失效，请重新登录');
    }
  }
}
