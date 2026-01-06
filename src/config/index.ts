import { APP_CONFIG_KEY, appConfig, AppConfigType } from './app.config';
import { DB_CONFIG_KEY, dbConfig, DbConfigType } from './db.config';
import { REDIS_CONFIG_KEY, redisConfig, RedisConfigType } from './redis.config';
import { EMAIL_CONFIG_KEY, emailConfig, EmailConfigType } from './email.config';
import { JWT_CONFIG_KEY, jwtConfig, JwtConfigType } from './jwt.config';
import {
  SWAGGER_CONFIG_KEY,
  swaggerConfig,
  SwaggerConfigType,
} from './swagger.config';

export interface AllConfigType {
  [APP_CONFIG_KEY]: AppConfigType;
  [DB_CONFIG_KEY]: DbConfigType;
  [SWAGGER_CONFIG_KEY]: SwaggerConfigType;
  [REDIS_CONFIG_KEY]: RedisConfigType;
  [EMAIL_CONFIG_KEY]: EmailConfigType;
  [JWT_CONFIG_KEY]: JwtConfigType;
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;

export * from './app.config';
export * from './db.config';
export * from './swagger.config';
export * from './redis.config';
export * from './email.config';
export * from './jwt.config';

export default {
  appConfig,
  dbConfig,
  swaggerConfig,
  redisConfig,
  emailConfig,
  jwtConfig,
};
