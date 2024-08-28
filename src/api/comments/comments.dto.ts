import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { ID } from "src/core/base/id.type";

export class CommentDto {
    @Expose()
    @ApiProperty({ description: 'Comment ID', example: 1 })
    id: ID;

    @Expose()
    @ApiProperty({ description: 'Comment text', example: 'Comment text' })
    text: string;

    @Expose()
    @ApiProperty({ description: 'Card ID', example: 1 })
    cardId: ID;

    @Expose()
    @ApiProperty({ description: 'Comment creation date', format: 'date-time', example: '2024-01-01T00:00:00.000Z' })
    createdAt: Date;

    @Expose()
    @ApiProperty({ description: 'Comment update date', format: 'date-time', example: '2024-01-01T00:00:00.000Z' })
    updatedAt: Date;

    constructor(source: CommentDto) {
        Object.assign(this, source);
    }
}


export class PostCommentDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Comment text', example: 'Comment text' })
    text: string;
}


export class PatchCommentDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Comment text', example: 'Comment text' })
    text: string;
}
