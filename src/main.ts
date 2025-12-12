import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from './core/filters/global.exception.filter';
import { setupSwagger } from './helper/setupSwagger';
import {
  SWAGGER_CONFIG_KEY,
  APP_CONFIG_KEY,
  DB_CONFIG_KEY,
  AllConfigType,
} from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService<AllConfigType, true>);

  const { port, name, apiPrefix } = configService.get(APP_CONFIG_KEY, {
    infer: true,
  });

  const { enabled, path } = configService.get(SWAGGER_CONFIG_KEY, {
    infer: true,
  });

  const dbConfig = configService.get(DB_CONFIG_KEY, {
    infer: true,
  });

  console.log(dbConfig);

  app.useStaticAssets('public', {
    prefix: '/static',
  });

  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());

  if (enabled) {
    setupSwagger(app, name, path);
  }

  await app.listen(port, '0.0.0.0', () => {
    void app.getUrl().then((url) => {
      const logger = new Logger(name);
      logger.log(`Application listening on: ${url}`);
      if (enabled) {
        logger.log(`Swagger listening on: ${url}/${path}`);
      }
    });
  });
}

void bootstrap();
