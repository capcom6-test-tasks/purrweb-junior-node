import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDateString, IsNumber, IsOptional, Length } from "class-validator";
import { ID } from "src/core/base/id.type";

export class CardDto {
    @Expose()
    @ApiProperty({ description: 'Card ID', example: 1 })
    id: ID;

    @Expose()
    @ApiProperty({ description: 'Card title', example: 'My first card' })
    title: string;

    @Expose()
    @ApiProperty({ description: 'Card description', example: 'This is my first card' })
    description: string;

    @Expose()
    @ApiPropertyOptional({ description: 'Card due date', format: 'date-time', example: '2024-01-01T00:00:00.000Z' })
    dueDate?: Date;

    @Expose()
    @ApiProperty({ description: 'Card column ID', example: 1 })
    columnId: ID;

    @Expose()
    @ApiProperty({ description: 'Card creation date', format: 'date-time', example: '2024-01-01T00:00:00.000Z' })
    createdAt: Date;

    @Expose()
    @ApiProperty({ description: 'Card update date', format: 'date-time', example: '2024-01-01T00:00:00.000Z' })
    updatedAt: Date;

    constructor(source: CardDto) {
        Object.assign(this, source);
    }
}


export class PostCardDto {
    @Length(1, 100)
    @ApiProperty({ description: 'Card title', example: 'My first card', minLength: 1, maxLength: 100 })
    title: string;

    @Length(0, 1000)
    @ApiProperty({ description: 'Card description', example: 'This is my first card', maxLength: 1000 })
    description: string;

    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional({ description: 'Card due date', format: 'date-time', example: '2024-01-01T00:00:00.000Z' })
    dueDate?: Date;
}


export class PatchCardDto {
    @IsOptional()
    @Length(1, 100)
    @ApiPropertyOptional({ description: 'Card title', example: 'My first card', minLength: 1, maxLength: 100 })
    title?: string;

    @IsOptional()
    @Length(0, 1000)
    @ApiPropertyOptional({ description: 'Card description', example: 'This is my first card', maxLength: 1000 })
    description?: string;

    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional({ description: 'Card due date', format: 'date-time', example: '2024-01-01T00:00:00.000Z' })
    dueDate?: Date;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: 'Card column ID', example: 1 })
    columnId?: ID;
}
