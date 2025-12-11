import { registerAs, ConfigType } from '@nestjs/config';
import { env, envBoolean } from '../helper/env';

export const SWAGGER_CONFIG_KEY = 'SWAGGER_CONFIG';

export const swaggerConfig = registerAs(SWAGGER_CONFIG_KEY, () => ({
  enabled: envBoolean('SWAGGER_ENABLED'),
  path: env('SWAGGER_PATH'),
}));

export type SwaggerConfigType = ConfigType<typeof swaggerConfig>;
