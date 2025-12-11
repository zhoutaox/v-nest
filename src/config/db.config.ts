import { registerAs, ConfigType } from '@nestjs/config';

export const DB_CONFIG_KEY = 'DB_CONFIG';

export const dbConfig = registerAs(DB_CONFIG_KEY, () => ({}));

export type DbConfigType = ConfigType<typeof dbConfig>;
