import { APP_CONFIG_KEY, appConfig, AppConfigType } from './app.config';
import { DB_CONFIG_KEY, dbConfig, DbConfigType } from './db.config';
import {
  SWAGGER_CONFIG_KEY,
  swaggerConfig,
  SwaggerConfigType,
} from './swagger.config';

export interface AllConfigType {
  [APP_CONFIG_KEY]: AppConfigType;
  [DB_CONFIG_KEY]: DbConfigType;
  [SWAGGER_CONFIG_KEY]: SwaggerConfigType;
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;

export * from './app.config';
export * from './db.config';
export * from './swagger.config';

export default {
  appConfig,
  dbConfig,
  swaggerConfig,
};
