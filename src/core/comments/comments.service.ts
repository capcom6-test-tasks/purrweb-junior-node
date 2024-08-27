import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CommentItem, CreateComment, UpdateComment } from './comments.item';
import { ID } from '../base/id.type';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
    private readonly comments: Repository<Comment>;

    constructor(
        dataSource: DataSource
    ) {
        this.comments = dataSource.getRepository(Comment);
    }


    public async findAll(cardId: ID): Promise<CommentItem[]> {
        const comments = await this.comments
            .find({ where: { cardId } });

        return comments;
    }


    public async findById(id: ID): Promise<CommentItem | null> {
        const comment = await this.comments
            .findOneBy({ id });
        return comment;
    }


    public async create(data: CreateComment): Promise<CommentItem> {
        const comment = new Comment();
        Object.assign(comment, data);
        return await this.comments
            .save(comment);
    }


    public async update(id: ID, data: UpdateComment): Promise<CommentItem> {
        const comment = await this.comments
            .findOneBy({ id });

        Object.assign(comment, data);

        return await this.comments
            .save(comment);
    }


    public async delete(id: ID): Promise<void> {
        await this.comments
            .delete({ id });
    }
}
