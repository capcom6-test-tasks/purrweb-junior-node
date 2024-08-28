import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsHexColor, IsNotEmpty, IsOptional, Length } from "class-validator";
import { ID } from "src/core/base/id.type";

export class ColumnDto {
    @Expose()
    @ApiProperty({ description: 'Column ID', example: 1 })
    id: ID;

    @Expose()
    @ApiProperty({ description: 'Column position', type: Number, example: 1 })
    position: number;

    @Expose()
    @ApiProperty({ description: 'Column title', example: 'Todo' })
    title: string;

    @Expose()
    @ApiPropertyOptional({ description: 'Column color', example: '#FFFFFF' })
    color?: string;

    constructor(source: ColumnDto) {
        Object.assign(this, source);
    }
}

export class PostColumnDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'Column position', type: Number, example: 1 })
    position: number;

    @Length(1, 255)
    @ApiProperty({ description: 'Column title', example: 'Todo', minLength: 1, maxLength: 255 })
    title: string;

    @IsHexColor()
    @IsOptional()
    @ApiPropertyOptional({ description: 'Column color', example: '#FFFFFF' })
    color?: string;
}

export class PatchColumnDto {
    @IsOptional()
    @ApiPropertyOptional({ description: 'Column position', type: Number, example: 1 })
    position?: number;

    @Length(1, 255)
    @IsOptional()
    @ApiPropertyOptional({ description: 'Column title', example: 'Todo', minLength: 1, maxLength: 255 })
    title?: string;

    @IsHexColor()
    @IsOptional()
    @ApiPropertyOptional({ description: 'Column color', example: '#FFFFFF' })
    color?: string;
}
