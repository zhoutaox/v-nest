import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseEntity } from '@/core/model/BaseEntity';

@Entity()
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '菜单标题',
  })
  title: string;

  @Column({
    length: 50,
    comment: '菜单路径',
  })
  path: string;

  @Column({
    length: 50,
    comment: '组件地址',
  })
  componentUrl: string;

  @Column({
    comment: '菜单类型',
    type: 'tinyint',
    default: 1,
  })
  menuType: number;

  @Column({
    comment: '图标',
    length: 50,
  })
  icon: string;

  @Column({
    comment: '父级id',
    type: 'int',
    default: 0,
  })
  pid: number;
}
