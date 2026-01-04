import { BaseEntity } from '@/core/model/BaseEntity';
import { Column, Entity } from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';

@Entity('aiform_field')
export class AiFormField extends BaseEntity {
  @IsNotEmpty({
    message: '字段名称不能为空',
  })
  @Length(1, 20, {
    message: '字段名称长度不能超过20个字符',
  })
  @Column({
    type: 'varchar',
    length: 100,
    comment: '字段名称',
  })
  name: string;

  @IsNotEmpty({
    message: '数据库字段名称不能为空',
  })
  @Length(1, 20, {
    message: '数据库字段名称长度不能超过20个字符',
  })
  @Column({
    type: 'varchar',
    length: 100,
    comment: '数据库字段名称',
  })
  dbName: string;

  @Column({
    type: 'varchar',
    length: 250,
    comment: '字段描述',
  })
  description: string;
}
