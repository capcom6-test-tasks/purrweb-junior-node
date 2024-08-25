import { Expose } from "class-transformer";
import { ID } from "src/core/base/id.type";

export class Column {
    @Expose()
    id: ID;
    @Expose()
    position: number;
    @Expose()
    title: string;
    @Expose()
    color: string;
}

export type PostColumn = Omit<Column, 'id'>;
export type PatchColumn = Partial<PostColumn>;
