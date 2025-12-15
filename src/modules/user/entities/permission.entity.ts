import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/core/model/BaseEntity';

@Entity()
export class Permission extends BaseEntity {
  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 100,
    nullable: true,
  })
  desc: string;
}
