import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(
  app: INestApplication,
  name: string,
  path: string,
): void {
  const config = new DocumentBuilder()
    .setTitle(name)
    .setVersion('1.0')
    .setDescription('The v-nest-application API description')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
}
