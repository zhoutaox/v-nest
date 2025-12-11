import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { LogInterceptor } from './core/interceptors/log.interceptor';
import { MapInterceptor } from './core/interceptors/map.interceptor';
import { CatchErrorTestInterceptor } from './core/interceptors/catch.error.test.interceptor';
import { TimeoutInterceptor } from './core/interceptors/timeout.interceptor';
import { AaaModule } from './modules/aaa/aaa.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { Permission } from './modules/user/entities/permission.entity';
import { Job } from './modules/job/entities/job.entity';
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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'login_test',
      synchronize: true,
      logging: true,
      entities: [User, Permission, Job],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
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
