import { BaseEntity } from '@/core/model/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('aiform')
export class AiForm extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    comment: '表单名称',
  })
  name: string;

  desc: string;
}
