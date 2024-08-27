import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsController } from './cards/cards.controller';
import { CardsService } from './cards/cards.service';

@Module({
  imports: [UsersModule, ColumnsModule],
  exports: [UsersModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CoreModule { }
