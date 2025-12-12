import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/database.module';
import config from './config';
import { LogInterceptor } from './core/interceptors/log.interceptor';
import { MapInterceptor } from './core/interceptors/map.interceptor';
import { CatchErrorTestInterceptor } from './core/interceptors/catch.error.test.interceptor';
import { TimeoutInterceptor } from './core/interceptors/timeout.interceptor';
import { AaaModule } from './modules/aaa/aaa.module';
import { UserModule } from './modules/user/user.module';
import { MenuModule } from './modules/menu/menu.module';
import { AiFormModule } from './modules/aiForm/aiForm.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { DbModule } from './modules/db/db.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hello-mongo'),
    HttpModule.register({
      timeout: 5000,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // 指定多个 env 文件时，第一个优先级最高
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: Object.values(config),
    }),
    JwtModule.register({
      global: true,
      secret: 'v-admin-secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    DatabaseModule,
    MenuModule,
    AiFormModule,
    AaaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CatchErrorTestInterceptor,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MapInterceptor,
    },
  ],
})
export class AppModule {}
