import { ID } from "../base/id.type";
import { User } from "../users/user.entity";

export interface ColumnItem {
    id: ID;
    position: number;
    title: string;
    color: string;

    user: User;
}

export type CreateColumn = Omit<ColumnItem, 'id'>;
export type UpdateColumn = Partial<CreateColumn>;
