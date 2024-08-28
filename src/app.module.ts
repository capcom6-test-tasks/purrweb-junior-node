import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { ConfigModule } from './config/config.module';
import { DbConfig } from './config/db.config';
import { CoreModule } from './core/core.module';
import { dataSourceOptions } from './db';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DbConfig],
      useFactory: (config: DbConfig) => {
        return {
          ...dataSourceOptions,
          type: 'mysql',
          host: config.DB_HOST,
          port: config.DB_PORT,
          username: config.DB_USERNAME,
          password: config.DB_PASSWORD,
          database: config.DB_NAME,
        };
      },
    }),
    CoreModule,
    ApiModule
  ],
})
export class AppModule { }
