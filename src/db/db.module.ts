import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './db.config';


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService<Config>) => {
                return {
                    type: 'mysql',
                    host: config.get('DB_HOST', 'localhost'),
                    port: config.get('DB_PORT', 3306),
                    username: config.get('DB_USERNAME', 'trello'),
                    password: config.get('DB_PASSWORD', 'trello'),
                    database: config.get('DB_NAME', 'trello'),
                    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    synchronize: process.env.NODE_ENV !== 'production',
                }
            },
        })
    ],
})
export class DbModule { }
