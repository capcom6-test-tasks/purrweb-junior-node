import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from 'src/config/config.module';
import { JwtConfig } from 'src/config/jwt.config';
import { UsersModule } from 'src/core/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [JwtConfig],
            useFactory: (config: JwtConfig) => ({
                secret: config.JWT_SECRET,
                signOptions: {
                    expiresIn: config.JWT_EXPIRES_IN,
                }
            })
        }),
        UsersModule
    ],
    providers: [LocalStrategy, JwtStrategy, AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
