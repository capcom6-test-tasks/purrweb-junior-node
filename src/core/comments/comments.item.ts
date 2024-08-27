import { ID } from "../base/id.type";

export interface CommentItem {
    id: ID;
    text: string;

    createdAt: Date;
    updatedAt: Date;

    cardId: ID;
}

export type CreateComment = Omit<CommentItem, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateComment = Partial<Omit<CreateComment, 'cardId'>>;
