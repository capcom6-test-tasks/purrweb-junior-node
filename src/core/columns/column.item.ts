import { ID } from "../base/id.type";

export interface ColumnItem {
    id: ID;
    position: number;
    title: string;
    color?: string;

    createdAt: Date;
    updatedAt: Date;

    userId: ID;
}

export type CreateColumn = Omit<ColumnItem, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateColumn = Partial<CreateColumn>;
