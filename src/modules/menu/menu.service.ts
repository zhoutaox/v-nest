import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';

@Injectable()
export class MenuService {
  @InjectRepository(Menu)
  private menuRepository: Repository<Menu>;

  async initMenu() {
    const menu1 = new Menu();
    menu1.iid = nanoid();
    menu1.title = 'Dashboard';
    menu1.icon = 'guide';
    menu1.path = '/dashboard';

    const m1_c1 = new Menu();
    m1_c1.title = '主控台';
    m1_c1.icon = 'home';
    m1_c1.path = '/home';
    m1_c1.componentUrl = 'dashboard/home';
    m1_c1.pid = menu1.iid;

    const m1_c2 = new Menu();
    m1_c2.title = '监控台';
    m1_c2.icon = 'global';
    m1_c2.path = '/monitor';
    m1_c2.componentUrl = 'dashboard/monitor';
    m1_c2.pid = menu1.iid;

    await this.menuRepository.save([menu1, m1_c1, m1_c2]);

    const menu2 = new Menu();
    menu2.iid = nanoid();
    menu2.title = '系统管理';
    menu2.icon = 'product';
    menu2.path = '/system';

    const m2_c1 = new Menu();
    m2_c1.title = '用户管理';
    m2_c1.icon = 'customer-official';
    m2_c1.path = '/user';
    m2_c1.componentUrl = '/system/user';
    m2_c1.pid = menu2.iid;

    const m2_c2 = new Menu();
    m2_c2.title = '角色管理';
    m2_c2.icon = 'vip-management';
    m2_c2.path = '/role';
    m2_c2.componentUrl = '/system/role';
    m2_c2.pid = menu2.iid;

    const m2_c3 = new Menu();
    m2_c3.title = '菜单管理';
    m2_c3.icon = 'gongyinglianfuwu';
    m2_c3.path = '/menu';
    m2_c3.componentUrl = '/system/menu';
    m2_c3.pid = menu2.iid;

    const m2_c4 = new Menu();
    m2_c4.title = '表单管理';
    m2_c4.icon = 'goods-inspection';
    m2_c4.path = '/form';
    m2_c4.componentUrl = '/system/form';
    m2_c4.pid = menu2.iid;

    const m2_c5 = new Menu();
    m2_c5.title = '字典管理';
    m2_c5.icon = 'logistics-picked-up';
    m2_c5.path = '/dict';
    m2_c5.componentUrl = '/system/dict';
    m2_c5.pid = menu2.iid;

    await this.menuRepository.save([menu2, m2_c1, m2_c2, m2_c3, m2_c4, m2_c5]);

    const menu3 = new Menu();
    menu3.iid = nanoid();
    menu3.title = '系统工具';
    menu3.icon = 'tool';
    menu3.path = '/tools';

    const m3_c1 = new Menu();
    m3_c1.title = '图标库';
    m3_c1.icon = 'vip';
    m3_c1.path = '/icons';
    m3_c1.componentUrl = '/tools/icon';
    m3_c1.pid = menu3.iid;

    const m3_c2 = new Menu();
    m3_c2.title = 'api文档';
    m3_c2.icon = 'code';
    m3_c2.path = '/api';
    m3_c2.componentUrl = '/tools/api';
    m3_c2.pid = menu3.iid;

    await this.menuRepository.save([menu3, m3_c1, m3_c2]);

    const menu4 = new Menu();
    menu4.iid = nanoid();
    menu4.title = '系统配置';
    menu4.icon = 'settings';
    menu4.path = '/parameter';

    const m4_c1 = new Menu();
    m4_c1.title = '系统参数';
    m4_c1.icon = 'settings';
    m4_c1.path = '/parameter/app';
    m4_c1.componentUrl = '/parameter/app';
    m4_c1.pid = menu4.iid;

    const m4_c2 = new Menu();
    m4_c2.title = '数据库参数';
    m4_c2.icon = 'email';
    m4_c2.path = '/parameter/db';
    m4_c2.componentUrl = '/parameter/db';
    m4_c2.pid = menu4.iid;

    await this.menuRepository.save([menu4, m4_c1, m4_c2]);

    const menu5 = new Menu();
    menu5.iid = nanoid();
    menu5.title = '问卷管理';
    menu5.icon = 'customer-service';
    menu5.path = '/questionnaire';

    await this.menuRepository.save([menu5]);

    const menu6 = new Menu();
    menu6.iid = nanoid();
    menu6.title = '搜索页';
    menu6.icon = 'search';
    menu6.path = '/search';

    const menu6_c1 = new Menu();
    menu6_c1.title = '搜索模板';
    menu6_c1.icon = 'template';
    menu6_c1.path = '/search/template';
    menu6_c1.componentUrl = '/search/template';
    menu6_c1.pid = menu6.iid;

    await this.menuRepository.save([menu6, menu6_c1]);

    const menu7 = new Menu();
    menu7.iid = nanoid();
    menu7.title = '常用模板';
    menu7.icon = 'template';
    menu7.path = '/template';

    const menu7_c1 = new Menu();
    menu7_c1.title = '成功页';
    menu7_c1.icon = 'template';
    menu7_c1.path = '/template/success';
    menu7_c1.componentUrl = '/template/success';
    menu7_c1.pid = menu7.iid;

    const menu7_c2 = new Menu();
    menu7_c2.title = '失败页';
    menu7_c2.icon = 'template';
    menu7_c2.path = '/template/fail';
    menu7_c2.componentUrl = '/template/fail';
    menu7_c2.pid = menu7.iid;

    const menu7_c3 = new Menu();
    menu7_c3.title = '信息页';
    menu7_c3.icon = 'template';
    menu7_c3.path = '/template/info';
    menu7_c3.componentUrl = '/template/info';
    menu7_c3.pid = menu7.iid;

    await this.menuRepository.save([menu7, menu7_c1, menu7_c2, menu7_c3]);

    const menu8 = new Menu();
    menu8.iid = nanoid();
    menu8.title = '关于';
    menu8.path = '/about';
    menu8.icon = 'business-icon-feeds-logo';
    menu8.componentUrl = '/documentation/about';

    await this.menuRepository.save([menu8]);
  }

  getAllMenus() {
    return this.menuRepository.find({
      order: {
        createTime: 'ASC',
      },
    });
  }
}
