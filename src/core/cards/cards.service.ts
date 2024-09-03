import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from '../base/id.type';
import { Card } from './cards.entity';
import { CardItem, CreateCard, UpdateCard } from './cards.item';

@Injectable()
export class CardsService {

    constructor(
        @InjectRepository(Card)
        private readonly cards: Repository<Card>,
    ) {
    }


    public async findAll(columnId: ID): Promise<CardItem[]> {
        const cards = await this.cards
            .find({ where: { columnId } });
        return cards;
    }


    public async findById(id: ID): Promise<CardItem | null> {
        const card = await this.cards
            .findOneBy({ id });
        return card;
    }


    public async create(data: CreateCard): Promise<CardItem> {
        const card = new Card();
        Object.assign(card, data);

        return await this.cards
            .save(card);
    }


    public async update(id: ID, data: UpdateCard): Promise<CardItem> {
        const card = await this.cards
            .findOneBy({ id });

        Object.assign(card, data);

        return await this.cards
            .save(card);
    }


    public async delete(id: ID): Promise<void> {
        await this.cards
            .delete({ id });
    }
}
