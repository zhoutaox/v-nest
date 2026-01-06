import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/core/model/BaseEntity';

@Entity()
export class Permission extends BaseEntity {
  @Column({
    comment: '权限代码',
    length: 20,
  })
  code: string;

  @Column({
    length: 100,
    comment: '权限描述',
  })
  description: string;
}
