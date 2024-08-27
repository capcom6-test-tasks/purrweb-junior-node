import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Card } from './cards.entity';
import { ID } from '../base/id.type';

@Injectable()
export class CardsService {
    private readonly cards: Repository<Card>;

    constructor(
        dataSource: DataSource
    ) {
        this.cards = dataSource.getRepository(Card);
    }


    public async findAll(columnId: ID): Promise<Card[]> {
        const cards = await this.cards
            .find({ where: { columnId } });
        return cards;
    }
}
