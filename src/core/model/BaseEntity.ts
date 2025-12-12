import {
  Entity,
  PrimaryColumn,
  BaseEntity as TypeormBaseEntity,
  BeforeInsert,
} from 'typeorm';
import { nanoid } from 'nanoid';

@Entity()
export class BaseEntity extends TypeormBaseEntity {
  @PrimaryColumn({
    comment: '主键id',
  })
  iid: string;

  @BeforeInsert()
  generateId() {
    if (!this.iid) {
      this.iid = nanoid();
    }
  }
}
