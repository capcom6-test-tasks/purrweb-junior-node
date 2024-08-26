import { Expose } from "class-transformer";
import { ID } from "src/core/base/id.type";

export class ColumnDto {
    @Expose()
    id: ID;
    @Expose()
    position: number;
    @Expose()
    title: string;
    @Expose()
    color: string;

    constructor(source: ColumnDto) {
        Object.assign(this, source);
    }
}

export type PostColumnDto = Omit<ColumnDto, 'id'>;
export type PatchColumnDto = Partial<PostColumnDto>;
