import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersApiModule } from './users/users.module';
import { ColumnsApiModule } from './columns/columns.module';
import { RouterModule } from '@nestjs/core';
import { USER_ID_PARAM } from './users/users.const';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    AuthModule,
    UsersApiModule,
    ColumnsApiModule,
    RouterModule.register([
      {
        path: `/users/:${USER_ID_PARAM}`,
        children: [
          {
            path: 'columns',
            module: ColumnsApiModule
          }
        ]
      }
    ]),
    CardsModule
  ],
  controllers: []
})
export class ApiModule { }
