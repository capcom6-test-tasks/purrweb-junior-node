import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CardsService } from 'src/core/cards/cards.service';
import { CardDto, PatchCardDto, PostCardDto } from './cards.dto';
import { COLUMN_ID_PARAM } from '../columns/columns.const';
import { ID } from 'src/core/base/id.type';
import { ColumnsGuard } from '../columns/columns.guard';
import { UsersGuard } from '../users/users.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ColumnsService } from 'src/core/columns/columns.service';
import { User } from '../auth/decorators/user.decorator';
import { UserItem } from 'src/core/users/user.dto';
import { use } from 'passport';

@Controller()
@UseGuards(JwtAuthGuard, UsersGuard, ColumnsGuard)
export class CardsController {
    constructor(
        private readonly cardsService: CardsService,
        private readonly columnsService: ColumnsService
    ) { }

    @Get()
    async findAll(@Param(COLUMN_ID_PARAM) columnId: ID): Promise<CardDto[]> {
        const cards = await this.cardsService.findAll(columnId);

        return cards.map(card => new CardDto(card));
    }

    @Get(`:cardId`)
    async findOne(@Param(COLUMN_ID_PARAM) columnId: ID, @Param('cardId') cardId: ID): Promise<CardDto> {
        const card = await this.cardsService.findById(cardId);
        if (card?.columnId != columnId) {
            throw new NotFoundException('Card not found');
        }

        return new CardDto(card);
    }

    @Post()
    async create(@Param(COLUMN_ID_PARAM) columnId: ID, @Body() body: PostCardDto): Promise<CardDto> {
        const card = await this.cardsService.create({ ...body, columnId });
        return new CardDto(card);
    }

    @Patch(`:cardId`)
    async update(
        @User() user: UserItem,
        @Param(COLUMN_ID_PARAM) columnId: ID,
        @Param('cardId') cardId: ID,
        @Body() body: PatchCardDto
    ): Promise<CardDto> {
        const existed = await this.cardsService.findById(cardId);
        if (existed?.columnId != columnId) {
            throw new NotFoundException('Card not found');
        }

        if (body.columnId) {
            const column = await this.columnsService.findById(body.columnId);
            if (column?.userId != user.id) {
                throw new NotFoundException('Column not found');
            }
        }

        const card = await this.cardsService.update(cardId, { ...body });
        return new CardDto(card);
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
