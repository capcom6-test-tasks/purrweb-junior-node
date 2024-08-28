import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UsersGuard } from '../users/users.guard';
import { ColumnsGuard } from '../columns/columns.guard';
import { CommentsService } from 'src/core/comments/comments.service';
import { CARD_ID_PARAM } from '../cards/cards.const';
import { ID } from 'src/core/base/id.type';
import { CommentDto, PatchCommentDto, PostCommentDto } from './comments.dto';
import { CardsGuard } from '../cards/cards.guard';
import { Card } from '../cards/cards.decorator';
import { CardItem } from 'src/core/cards/cards.item';
import { CommentsGuard } from './comments.guard';
import { Comment } from './comments.decorator';
import { CommentItem } from 'src/core/comments/comments.item';
import { COMMENT_ID_PARAM } from './comments.const';

@Controller()
@UseGuards(JwtAuthGuard, UsersGuard, ColumnsGuard, CardsGuard)
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService
    ) { }

    @Get()
    async findAll(
        @Card() card: CardItem
    ): Promise<CommentDto[]> {
        const comments = await this.commentsService.findAll(card.id);

        return comments.map(comment => new CommentDto(comment));
    }


    @Get(`:${COMMENT_ID_PARAM}`)
    @UseGuards(CommentsGuard)
    async findById(
        @Comment() comment: CommentItem
    ): Promise<CommentDto | null> {
        return new CommentDto(comment);
    }

    @Post()
    async create(
        @Card() card: CardItem,
        @Body() data: PostCommentDto
    ): Promise<CommentDto> {
        const comment = await this.commentsService.create({ ...data, cardId: card.id });

        return new CommentDto(comment);
    }

    @Get(`:${COMMENT_ID_PARAM}`)
    @UseGuards(CommentsGuard)
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
    async delete(
        @Comment() comment: CommentItem
    ): Promise<void> {
        await this.commentsService.delete(comment.id);
    }
}
