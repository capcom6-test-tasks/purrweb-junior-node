import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { ID } from "src/core/base/id.type";

export class CommentDto {
    @Expose()
    id: ID;

    @Expose()
    text: string;

    @Expose()
    cardId: ID;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    constructor(source: CommentDto) {
        Object.assign(this, source);
    }
}


export class PostCommentDto {
    @IsNotEmpty()
    text: string;
}


export class PatchCommentDto {
    @IsNotEmpty()
    text: string;
}
