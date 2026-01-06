import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { md5 } from '@/utils/md5';
import { JsonResult } from '@/utils/json.result';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectEntityManager()
  private entityManager: EntityManager;

  private logger = new Logger();

  async login(user: LoginUserDto, jsonResult: JsonResult) {
    const foundUser = await this.userRepository.findOneBy({
      loginName: user.loginName,
    });

    if (!foundUser) {
      jsonResult.set(HttpStatus.BAD_REQUEST, '用户不存在');
      return null;
    }

    if (foundUser.password !== md5(user.password)) {
      jsonResult.set(HttpStatus.BAD_REQUEST, '密码错误');
      return null;
    }

    return foundUser;
  }
  async register(user: RegisterUserDto, jsonResult: JsonResult) {
    const foundUser = await this.userRepository.findOneBy({
      loginName: user.loginName,
    });

    if (foundUser) {
      jsonResult.set(HttpStatus.BAD_REQUEST, '用户已存在');
      return jsonResult;
    }

    const newUser = new User();

    newUser.loginName = user.loginName;
    newUser.username = user.username;
    newUser.password = md5(user.password);
    newUser.email = user.email;

    try {
      await this.userRepository.save(newUser);
      jsonResult.set(HttpStatus.OK);
      return jsonResult;
    } catch (error) {
      this.logger.error(error, UserService);
      jsonResult.set(HttpStatus.BAD_REQUEST, '注册失败');
      return jsonResult;
    }
  }

  initData() {
    const user1 = new User();
    user1.username = 'zhangsan';
    user1.password = md5('123456');
    user1.email = 'xxxx@xxx.com';
  }
}
