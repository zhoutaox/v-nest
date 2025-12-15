import { Injectable, Logger } from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import { MenuService } from './modules/menu/menu.service';
@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly menuService: MenuService,
  ) {}
  async init() {
    const logger = new Logger();
    try {
      await this.menuService.initMenu();
    } catch (e) {
      logger.error(e);
      logger.error('初始化menu模块失败');
      return false;
    }

    return true;
  }
}
