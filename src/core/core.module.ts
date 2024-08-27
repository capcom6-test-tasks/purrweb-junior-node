import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [UsersModule, ColumnsModule, CardsModule],
})
export class CoreModule { }
