import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersApiModule } from './users/users.module';
import { ColumnsApiModule } from './columns/columns.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    UsersApiModule,
    ColumnsApiModule,
    RouterModule.register([
      {
        path: 'users/:userId',
        children: [
          {
            path: 'columns',
            module: ColumnsApiModule
          }
        ]
      }
    ])
  ],
  controllers: []
})
export class ApiModule { }
