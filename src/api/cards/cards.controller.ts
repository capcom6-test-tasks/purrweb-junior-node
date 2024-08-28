import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardItem } from 'src/core/cards/cards.item';
import { CardsService } from 'src/core/cards/cards.service';
import { ColumnItem } from 'src/core/columns/columns.item';
import { ColumnsService } from 'src/core/columns/columns.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { COLUMN_ID_PARAM } from '../columns/columns.const';
import { Column } from '../columns/columns.decorator';
import { ColumnsGuard } from '../columns/columns.guard';
import { USER_ID_PARAM } from '../users/users.const';
import { UsersGuard } from '../users/users.guard';
import { CARD_ID_PARAM } from './cards.const';
import { Card } from './cards.decorator';
import { CardDto, PatchCardDto, PostCardDto } from './cards.dto';
import { CardsGuard } from './cards.guard';

@ApiTags('Cards')
@ApiBearerAuth()
@ApiParam({ name: USER_ID_PARAM, description: 'User ID' })
@ApiParam({ name: COLUMN_ID_PARAM, description: 'Column ID' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@Controller()
@UseGuards(JwtAuthGuard, UsersGuard, ColumnsGuard)
export class CardsController {
    constructor(
        private readonly cardsService: CardsService,
        private readonly columnsService: ColumnsService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all cards' })
    @ApiResponse({ status: 200, type: [CardDto] })
    async findAll(
        @Column() column: ColumnItem
    ): Promise<CardDto[]> {
        const cards = await this.cardsService.findAll(column.id);

        return cards.map(card => new CardDto(card));
    }

    @Get(`:${CARD_ID_PARAM}`)
    @UseGuards(CardsGuard)
    @ApiOperation({ summary: 'Get card by ID' })
    @ApiParam({ name: CARD_ID_PARAM, description: 'Card ID' })
    @ApiResponse({ status: 200, type: CardDto })
    @ApiNotFoundResponse({ description: 'Card not found' })
    async findOne(
        @Card() card: CardItem
    ): Promise<CardDto> {
        return new CardDto(card);
    }

    @Post()
    @ApiOperation({ summary: 'Create card' })
    @ApiResponse({ status: 201, type: CardDto })
    async create(
        @Column() column: ColumnItem,
        @Body() body: PostCardDto
    ): Promise<CardDto> {
        const card = await this.cardsService.create({ ...body, columnId: column.id });
        return new CardDto(card);
    }

    @Patch(`:cardId`)
    @UseGuards(CardsGuard)
    @ApiOperation({ summary: 'Update card' })
    @ApiParam({ name: CARD_ID_PARAM, description: 'Card ID' })
    @ApiResponse({ status: 200, type: CardDto })
    @ApiNotFoundResponse({ description: 'Card not found' })
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
    @UseGuards(CardsGuard)
    @ApiOperation({ summary: 'Delete card' })
    @ApiParam({ name: CARD_ID_PARAM, description: 'Card ID' })
    @ApiResponse({ status: 204 })
    @ApiNotFoundResponse({ description: 'Card not found' })
    async delete(
        @Card() card: CardItem
    ): Promise<void> {
        await this.cardsService.delete(card.id);
    }
}
