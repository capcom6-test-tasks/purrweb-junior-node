import { Body, Controller, Delete, Get, HttpCode, Patch, Post, UseGuards } from '@nestjs/common';
import { CardItem } from 'src/core/cards/cards.item';
import { CommentItem } from 'src/core/comments/comments.item';
import { CommentsService } from 'src/core/comments/comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Card } from '../cards/cards.decorator';
import { CardsGuard } from '../cards/cards.guard';
import { ColumnsGuard } from '../columns/columns.guard';
import { UsersGuard } from '../users/users.guard';
import { COMMENT_ID_PARAM } from './comments.const';
import { Comment } from './comments.decorator';
import { CommentDto, PatchCommentDto, PostCommentDto } from './comments.dto';
import { CommentsGuard } from './comments.guard';
import { ApiTags, ApiBearerAuth, ApiParam, ApiForbiddenResponse, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { COLUMN_ID_PARAM } from '../columns/columns.const';
import { USER_ID_PARAM } from '../users/users.const';
import { CARD_ID_PARAM } from '../cards/cards.const';

@ApiTags('Comments')
@ApiBearerAuth()
@ApiParam({ name: USER_ID_PARAM, description: 'User ID' })
@ApiParam({ name: COLUMN_ID_PARAM, description: 'Column ID' })
@ApiParam({ name: CARD_ID_PARAM, description: 'Card ID' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@Controller()
@UseGuards(JwtAuthGuard, UsersGuard, ColumnsGuard, CardsGuard)
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all comments' })
    @ApiOkResponse({ type: [CommentDto] })
    async findAll(
        @Card() card: CardItem
    ): Promise<CommentDto[]> {
        const comments = await this.commentsService.findAll(card.id);

        return comments.map(comment => new CommentDto(comment));
    }


    @Get(`:${COMMENT_ID_PARAM}`)
    @UseGuards(CommentsGuard)
    @ApiOperation({ summary: 'Get comment by ID' })
    @ApiParam({ name: COMMENT_ID_PARAM, description: 'Comment ID' })
    @ApiOkResponse({ type: CommentDto })
    @ApiNotFoundResponse({ description: 'Comment not found' })
    async findById(
        @Comment() comment: CommentItem
    ): Promise<CommentDto> {
        return new CommentDto(comment);
    }

    @Post()
    @ApiOperation({ summary: 'Create comment' })
    @ApiOkResponse({ status: 201, type: CommentDto })
    async create(
        @Card() card: CardItem,
        @Body() data: PostCommentDto
    ): Promise<CommentDto> {
        const comment = await this.commentsService.create({ ...data, cardId: card.id });

        return new CommentDto(comment);
    }

    @Patch(`:${COMMENT_ID_PARAM}`)
    @UseGuards(CommentsGuard)
    @ApiOperation({ summary: 'Update comment' })
    @ApiParam({ name: COMMENT_ID_PARAM, description: 'Comment ID' })
    @ApiOkResponse({ type: CommentDto })
    @ApiNotFoundResponse({ description: 'Comment not found' })
    async update(
        @Comment() comment: CommentItem,
        @Body() data: PatchCommentDto
    ): Promise<CommentDto> {
        const updated = await this.commentsService.update(comment.id, data);

        return new CommentDto(updated);
    }

    @Delete(`:${COMMENT_ID_PARAM}`)
    @HttpCode(204)
    @UseGuards(CommentsGuard)
    @ApiOperation({ summary: 'Delete comment' })
    @ApiParam({ name: COMMENT_ID_PARAM, description: 'Comment ID' })
    @ApiOkResponse({ status: 204 })
    @ApiNotFoundResponse({ description: 'Comment not found' })
    async delete(
        @Comment() comment: CommentItem
    ): Promise<void> {
        await this.commentsService.delete(comment.id);
    }
}
