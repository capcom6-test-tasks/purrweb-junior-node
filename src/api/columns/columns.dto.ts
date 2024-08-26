import { Expose } from "class-transformer";
import { IsHexColor, IsNotEmpty, IsOptional, Length } from "class-validator";
import { ID } from "src/core/base/id.type";

export class ColumnDto {
    @Expose()
    id: ID;

    @Expose()
    position: number;

    @Expose()
    title: string;

    @Expose()
    color?: string;

    constructor(source: ColumnDto) {
        Object.assign(this, source);
    }
}

export class PostColumnDto {
    @IsNotEmpty()
    position: number;

    @Length(1, 255)
    title: string;

    @IsHexColor()
    @IsOptional()
    color?: string;
}

export class PatchColumnDto {
    @IsOptional()
    position?: number;

    @Length(1, 255)
    @IsOptional()
    title?: string;

    @IsHexColor()
    @IsOptional()
    color?: string;
}
