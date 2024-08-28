import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule } from 'src/core/users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [UsersModule, AuthModule],
    controllers: [UsersController],
})
export class UsersApiModule { }
