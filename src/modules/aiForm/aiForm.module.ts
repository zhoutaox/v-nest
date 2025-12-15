import { Module } from '@nestjs/common';
import { AiForm } from './entities/aiForm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiFormController } from './aiForm.controller';
import { AiFormService } from './aiForm.service';

@Module({
  imports: [TypeOrmModule.forFeature([AiForm])],
  controllers: [AiFormController],
  providers: [AiFormService],
})
export class AiFormModule {}
