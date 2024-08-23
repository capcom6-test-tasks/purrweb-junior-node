import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), CoreModule, AuthModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
