import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { CardsApiModule } from './cards/cards.module';
import { COLUMN_ID_PARAM } from './columns/columns.const';
import { ColumnsApiModule } from './columns/columns.module';
import { USER_ID_PARAM } from './users/users.const';
import { UsersApiModule } from './users/users.module';

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
            module: ColumnsApiModule,
            children: [
              {
                path: `:${COLUMN_ID_PARAM}/cards`,
                module: CardsApiModule,
              }
            ]
          }
        ]
      }
    ]),
    CardsApiModule
  ],
  controllers: []
})
export class ApiModule { }
