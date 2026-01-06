import { registerAs, ConfigType } from '@nestjs/config';
import { env, envNumber } from 'src/helper/env';

export const JWT_CONFIG_KEY = 'JWT_CONFIG';

export const jwtConfig = registerAs(JWT_CONFIG_KEY, () => ({
  secret: env('JWT_SECRET'),
  expiresIn: envNumber('JWT_EXPIRES_IN'),
}));

export type JwtConfigType = ConfigType<typeof jwtConfig>;
