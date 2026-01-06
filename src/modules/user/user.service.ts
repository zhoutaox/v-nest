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

  async initData() {
    // const permission1 = new Permission();
    // permission1.name = 'create_aaa';
    // permission1.desc = '创建aaa';
    // const permission2 = new Permission();
    // permission2.name = 'update_aaa';
    // permission2.desc = '更新aaa';
    // const permission3 = new Permission();
    // permission3.name = 'remove_aaa';
    // permission3.desc = '删除aaa';
    // const permission4 = new Permission();
    // permission4.name = 'query_aaa';
    // permission4.desc = '获取aaa';
    // const permission5 = new Permission();
    // permission5.name = 'create_bbb';
    // permission5.desc = '创建bbb';
    // const permission6 = new Permission();
    // permission6.name = 'update_bbb';
    // permission6.desc = '更新bbb';
    // const permission7 = new Permission();
    // permission7.name = 'remove_bbb';
    // permission7.desc = '删除bbb';
    // const permission8 = new Permission();
    // permission8.name = 'query_bbb';
    // permission8.desc = '获取bbb';
    // const user1 = new User();
    // user1.username = '罗新强';
    // user1.password = md5('123456');
    // user1.permissions = [permission1, permission2, permission3, permission4];
    // const user2 = new User();
    // user2.username = '周涛';
    // user2.password = md5('123456');
    // user2.permissions = [permission5, permission6, permission7, permission8];
    // await this.entityManager.save([
    //   permission1,
    //   permission2,
    //   permission3,
    //   permission4,
    //   permission5,
    //   permission6,
    //   permission7,
    //   permission8,
    //   user1,
    //   user2,
    // ]);
  }
}
