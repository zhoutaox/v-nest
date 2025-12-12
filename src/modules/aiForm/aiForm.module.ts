import { Module } from '@nestjs/common';
import { AiForm } from './entities/aiForm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from '../menu/menu.controller';
import { MenuService } from '../menu/menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([AiForm])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class AiFormModule {}
