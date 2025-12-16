import {
  Entity,
  PrimaryColumn,
  BaseEntity as TypeormBaseEntity,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { nanoid } from 'nanoid';

@Entity()
export class BaseEntity extends TypeormBaseEntity {
  @PrimaryColumn({
    comment: '主键id',
  })
  iid: string;

  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateTime: Date;

  @BeforeInsert()
  generateId() {
    if (!this.iid) {
      this.iid = nanoid(32);
    }
  }
}
