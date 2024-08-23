import { Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';
import { DbConfig } from './db.config';
import { JwtConfig } from './jwt.config';


@Module({
  imports: [
    NestConfig.forRoot(),
  ],
  providers: [
    JwtConfig,
    DbConfig,
  ],
  exports: [JwtConfig, DbConfig],
})
export class ConfigModule { }
