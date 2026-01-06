import { env, envNumber } from '@/helper/env';
import { registerAs, ConfigType } from '@nestjs/config';

export const EMAIL_CONFIG_KEY = 'EMAIL_CONFIG';

export const emailConfig = registerAs(EMAIL_CONFIG_KEY, () => ({
  host: env('EMAIL_HOST'),
  port: envNumber('EMAIL_PORT'),
  auth: {
    user: env('EMAIL_USER'),
    pass: env('EMAIL_PASS'),
  },
}));

export type EmailConfigType = ConfigType<typeof emailConfig>;
