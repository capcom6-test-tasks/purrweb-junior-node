import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, ColumnsModule, CardsModule, CommentsModule],
})
export class CoreModule { }
