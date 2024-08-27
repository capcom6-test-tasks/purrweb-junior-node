import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UsersGuard } from '../users/users.guard';
import { ColumnsGuard } from '../columns/columns.guard';
import { CommentsService } from 'src/core/comments/comments.service';
import { CARD_ID_PARAM } from '../cards/cards.const';
import { ID } from 'src/core/base/id.type';
import { CommentDto, PatchCommentDto, PostCommentDto } from './comments.dto';

@Controller()
@UseGuards(JwtAuthGuard, UsersGuard, ColumnsGuard)
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService
    ) { }

    @Get()
    async findAll(@Param(CARD_ID_PARAM) cardId: ID): Promise<CommentDto[]> {
        const comments = await this.commentsService.findAll(cardId);

        return comments.map(comment => new CommentDto(comment));
    }


    @Get(':id')
    async findById(@Param(CARD_ID_PARAM) cardId: ID, @Param('id') id: ID): Promise<CommentDto | null> {
        const comment = await this.commentsService.findById(id);
        if (!comment) {
            throw new NotFoundException();
        }

        if (comment.cardId !== cardId) {
            throw new NotFoundException();
        }

        return new CommentDto(comment);
    }

    @Post()
    async create(@Param(CARD_ID_PARAM) cardId: ID, @Body() data: PostCommentDto): Promise<CommentDto> {
        const comment = await this.commentsService.create({ ...data, cardId });
        return new CommentDto(comment);
    }

    @Patch(':id')
    async update(@Param(CARD_ID_PARAM) cardId: ID, @Param('id') id: ID, @Body() data: PatchCommentDto): Promise<CommentDto> {
        const existed = await this.commentsService.findById(id);
        if (existed?.cardId != cardId) {
            throw new NotFoundException();
        }

        const comment = await this.commentsService.update(id, data);
        return new CommentDto(comment);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param(CARD_ID_PARAM) cardId: ID, @Param('id') id: ID): Promise<void> {
        const existed = await this.commentsService.findById(id);
        if (existed?.cardId != cardId) {
            throw new NotFoundException();
        }

        await this.commentsService.delete(id);
    }
}
