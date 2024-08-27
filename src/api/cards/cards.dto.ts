import { Expose } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, Length } from "class-validator";
import { ID } from "src/core/base/id.type";

export class CardDto {
    @Expose()
    id: ID;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    dueDate?: Date;

    @Expose()
    columnId: ID;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    constructor(source: CardDto) {
        Object.assign(this, source);
    }
}


export class PostCardDto {
    @Length(1, 100)
    title: string;

    @Length(0, 1000)
    description: string;

    @IsOptional()
    @IsDateString()
    dueDate?: Date;
}


export class PatchCardDto {
    @IsOptional()
    @Length(1, 100)
    title?: string;

    @IsOptional()
    @Length(0, 1000)
    description?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: Date;

    @IsOptional()
    @IsNumber()
    columnId?: ID;
}
