import { Controller, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JsonResult } from '@/utils/json.result';
import { HttpStatus, Logger } from '@nestjs/common';
import { LoginGuard } from '@/core/guard/login.guard';

@Controller('menu')
export class MenuController {
  private readonly logger = new Logger();
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(LoginGuard)
  @Post('menus')
  async allMenus() {
    const jsonResult = JsonResult.getInstance();

    try {
      jsonResult.setData(await this.menuService.getAllMenus());
    } catch (error) {
      jsonResult.set(HttpStatus.INTERNAL_SERVER_ERROR);
      this.logger.error(error);
    }
    return jsonResult;
  }
}
