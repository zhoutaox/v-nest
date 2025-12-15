import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JsonResult } from 'src/utils/json.result';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService;
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() user: LoginUserDto) {
    const jsResult = JsonResult.getInstance();
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
          expiresIn: '1d',
        },
      );
      jsResult.set(HttpStatus.OK, '登陆成功');
      jsResult.setData({
        token,
      });
    }
    return jsResult;
  }

  @Post('register')
  register(@Body() user: RegisterUserDto) {
    return this.userService.register(user);
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
}
