import { ConfigKeyPaths } from '@/config';
import { Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG_KEY, type DbConfigType } from '@/config';
import { User } from '@/modules/user/entities/user.entity';
import { Permission } from '@/modules/user/entities/permission.entity';
import { Job } from '@/modules/job/entities/job.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
        const dbConfig = configService.get<DbConfigType>(DB_CONFIG_KEY);
        return {
          type: 'mysql',
          host: dbConfig?.host,
          port: dbConfig?.port,
          username: dbConfig?.username,
          password: dbConfig?.password,
          database: dbConfig?.database,
          //   autoLoadEntities: true,
          entities: [User, Permission, Job],
          entityPrefix: dbConfig?.prefix,
          synchronize: true,
          logging: true,
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'sha256_password',
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
