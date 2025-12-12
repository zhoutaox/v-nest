import { dbConfig } from '@/config';

export class AiFormName {
  static prefix = dbConfig().prefix;

  static user = this.prefix + 'user';

  static job = this.prefix + 'job';
}
