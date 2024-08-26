import { ID } from "../base/id.type";

export interface ColumnItem {
    id: ID;
    position: number;
    title: string;
    color?: string;

    userId: ID;
}

export type CreateColumn = Omit<ColumnItem, 'id'>;
export type UpdateColumn = Partial<CreateColumn>;
