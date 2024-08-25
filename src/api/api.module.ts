import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersApiModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersApiModule],
  controllers: []
})
export class ApiModule { }
