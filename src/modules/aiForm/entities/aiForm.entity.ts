import { BaseEntity } from '@/core/model/BaseEntity';
import { Entity } from 'typeorm';

@Entity()
export class AiForm extends BaseEntity {
  name: string;
}
