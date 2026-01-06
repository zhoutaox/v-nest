import { env, envNumber } from '@/helper/env';
import { registerAs, ConfigType } from '@nestjs/config';

export const REDIS_CONFIG_KEY = 'REDIS_CONFIG';

export const redisConfig = registerAs(REDIS_CONFIG_KEY, () => ({
  host: env('REDIS_HOST'),
  port: envNumber('REDIS_PORT'),
  password: env('REDIS_PASSWORD'),
}));

export type RedisConfigType = ConfigType<typeof redisConfig>;
