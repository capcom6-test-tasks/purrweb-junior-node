import { ID } from "../base/id.type";

export interface CardItem {
    id: ID;

    title: string;
    description: string;
    dueDate?: Date;

    columnId: ID;

    createdAt: Date;
    updatedAt: Date;
}

export type CreateCard = Omit<CardItem, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCard = Partial<CreateCard>;
