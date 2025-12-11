import { registerAs, ConfigType } from '@nestjs/config';
import { env, envNumber } from 'src/helper/env';

export const APP_CONFIG_KEY = 'APP_CONFIG';

export const appConfig = registerAs(APP_CONFIG_KEY, () => ({
  name: env('APP_NAME'),
  port: envNumber('APP_PORT', 3000),
  baseUrl: env('APP_BASE_URL'),
  apiPrefix: env('APP_API_PREFIX', 'api'),
}));

export type AppConfigType = ConfigType<typeof appConfig>;
