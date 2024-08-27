import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsModule } from 'src/core/cards/cards.module';
import { ColumnsModule } from 'src/core/columns/columns.module';

@Module({
  imports: [CardsModule, ColumnsModule],
  controllers: [CardsController]
})
export class CardsApiModule { }
