import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './cards.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Card])],
    providers: [CardsService],
    exports: [CardsService],
})
export class CardsModule { }
