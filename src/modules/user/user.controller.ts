import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Inject,
  Logger,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JsonResult } from 'src/utils/json.result';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginGuard } from '@/core/guard/login.guard';
import { EmailService } from '../../shared/email/email.service';
import { RedisService } from '@/shared/redis/redis.service';
import { jwtConfig } from '@/config';
import { RedisKeyType } from '@/core/constants/RedisKeyType';

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  private readonly logger = new Logger();
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body() user: LoginUserDto,
    @Headers('authorization') token: string,
  ) {
    const jwt = jwtConfig();
    const jsResult = JsonResult.getInstance();
    if (!token) {
      jsResult.set(HttpStatus.BAD_REQUEST, '请求头中缺少token');
      return jsResult;
    }
    const captcha = await this.redisService.get(
      `${RedisKeyType.CAPTCHA}${token}`,
    );
    if (!captcha) {
      jsResult.set(HttpStatus.BAD_REQUEST, '验证码已过期');
      return jsResult;
    }

    if (captcha.toLowerCase() !== user.captcha.toLowerCase()) {
      jsResult.set(HttpStatus.BAD_REQUEST, '验证码错误');
      return jsResult;
    }

    const foundUser = await this.userService.login(user, jsResult);

    if (foundUser) {
      const token = this.jwtService.sign(
        {
          user: {
            id: foundUser.iid,
            username: foundUser.username,
          },
        },
        {
          expiresIn: jwt.expiresIn,
        },
      );
      jsResult.set(HttpStatus.OK).setParams('token', token);
    }
    return jsResult;
  }

  @Post('emailLogin')
  emailLogin() {}

  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    const jsonResult = JsonResult.getInstance();
    const captcha = await this.redisService.get(
      `${RedisKeyType.REGISTER_EMAIL_CODE}${user.email}`,
    );

    if (!captcha) {
      return jsonResult.set(HttpStatus.BAD_REQUEST, '验证码已过期');
    }

    if (captcha !== user.captcha) {
      return jsonResult.set(HttpStatus.BAD_REQUEST, '验证码错误');
    }

    return this.userService.register(user, jsonResult);
  }

  @UseGuards(LoginGuard)
  @Post('getUserInfo')
  getUserInfo(@Headers('authorization') token: string) {
    const jsResult = JsonResult.getInstance();

    if (!token) {
      jsResult.set(HttpStatus.UNAUTHORIZED, '请先登录');
      return jsResult;
    }
    try {
      const payload = this.jwtService.verify<{
        user: object;
      }>(token);
      jsResult.set(HttpStatus.OK, '获取成功').setData(payload.user);
    } catch (e) {
      jsResult.set(
        HttpStatus.UNAUTHORIZED,
        (e as Error)?.message || 'token无效或已过期',
      );
    }
    return jsResult;
  }

  @Post('sendEmail')
  async sendEmail(@Body('email') email: string) {
    const jsonResult = JsonResult.getInstance();

    if (!email) {
      return jsonResult.set(HttpStatus.BAD_REQUEST, '邮箱不能为空');
    }

    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(
      `${RedisKeyType.REGISTER_EMAIL_CODE}${email}`,
      code,
      5 * 60,
    ); // 5分钟过期
    try {
      await this.emailService.sendEmail({
        to: email,
        subject: '注册验证码',
        html: `<p>你的注册验证码是 ${code}</p>`,
      });
    } catch (error) {
      jsonResult.set(HttpStatus.INTERNAL_SERVER_ERROR);
      this.logger.error(error, UserController.name);
      return jsonResult;
    }
    return jsonResult.set(HttpStatus.OK);
  }

  @Post('init')
  async init() {
    const jsonResult = JsonResult.getInstance();

    try {
      await this.userService.initData();
      jsonResult.set(HttpStatus.OK, '初始化成功');
    } catch (e) {
      new Logger().error(e, UserController.name);
      jsonResult.set(HttpStatus.BAD_REQUEST, '初始化失败');
    }
    return jsonResult;
  }

  @Post('dataList')
  dataList() {}

  @Post('pageList')
  pageList() {}
}
