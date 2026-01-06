import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '@/core/model/BaseEntity';
import { Permission } from './permission.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({
    comment: '角色名称',
  })
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission',
  })
  permissions: Permission[];
}
