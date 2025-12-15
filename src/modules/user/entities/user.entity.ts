import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Permission } from './permission.entity';
import { BaseEntity } from '@/core/model/BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Column({
    length: 50,
    comment: '用户名',
  })
  username: string;

  @Column({
    length: 50,
    comment: '密码',
  })
  password: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'user_permission_relation',
  })
  permissions: Permission[];
}
