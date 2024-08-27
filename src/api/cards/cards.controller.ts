import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ID } from 'src/core/base/id.type';
import { CardsService } from 'src/core/cards/cards.service';
import { ColumnItem } from 'src/core/columns/columns.item';
import { ColumnsService } from 'src/core/columns/columns.service';
import { UserItem } from 'src/core/users/user.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { COLUMN_ID_PARAM } from '../columns/columns.const';
import { Column } from '../columns/columns.decorator';
import { ColumnsGuard } from '../columns/columns.guard';
import { UsersGuard } from '../users/users.guard';
import { CardDto, PatchCardDto, PostCardDto } from './cards.dto';
import { CARD_ID_PARAM } from './cards.const';
import { CardsGuard } from './cards.guard';
import { Card } from './cards.decorator';
import { CardItem } from 'src/core/cards/cards.item';

@Controller()
@UseGuards(JwtAuthGuard, UsersGuard, ColumnsGuard)
export class CardsController {
    constructor(
        private readonly cardsService: CardsService,
        private readonly columnsService: ColumnsService
    ) { }

    @Get()
    async findAll(
        @Column() column: ColumnItem
    ): Promise<CardDto[]> {
        const cards = await this.cardsService.findAll(column.id);

        return cards.map(card => new CardDto(card));
    }

    @Get(`:${CARD_ID_PARAM}`)
    @UseGuards(CardsGuard)
    async findOne(
        @Card() card: CardItem
    ): Promise<CardDto> {
        return new CardDto(card);
    }

    @Post()
    async create(@Param(COLUMN_ID_PARAM) columnId: ID, @Body() body: PostCardDto): Promise<CardDto> {
        const card = await this.cardsService.create({ ...body, columnId });
        return new CardDto(card);
    }

    @Patch(`:cardId`)
    @UseGuards(CardsGuard)
    async update(
        @Column() column: ColumnItem,
        @Card() card: CardItem,
        @Body() body: PatchCardDto
    ): Promise<CardDto> {
        if (body.columnId && body.columnId != column.id) {
            const newColumn = await this.columnsService.findById(body.columnId);
            if (newColumn?.userId != column.userId) {
                throw new ForbiddenException();
            }
        }

        const updated = await this.cardsService.update(card.id, { ...body });
        return new CardDto(updated);
    }

    @Delete(`:cardId`)
    @HttpCode(204)
    async delete(@Param(COLUMN_ID_PARAM) columnId: ID, @Param('cardId') cardId: ID): Promise<void> {
        const existed = await this.cardsService.findById(cardId);
        if (existed?.columnId != columnId) {
            throw new NotFoundException('Card not found');
        }

        await this.cardsService.delete(cardId);
    }
}
