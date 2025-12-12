import { env, envNumber, envBoolean } from '@/helper/env';
import { registerAs, ConfigType } from '@nestjs/config';

export const DB_CONFIG_KEY = 'DB_CONFIG';

export const dbConfig = registerAs(DB_CONFIG_KEY, () => ({
  host: env('DB_HOST'),
  port: envNumber('DB_PORT'),
  database: env('DB_DATABASE'),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  synchronize: envBoolean('DB_SYNCHRONIZE'),
  prefix: env('DB_ENTITIES_PREFIX', ''),
}));

export type DbConfigType = ConfigType<typeof dbConfig>;
