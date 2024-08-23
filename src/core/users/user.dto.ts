export class UserItem {
    id: number;
    email: string;
    passwordHash: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUser {
    email: string;
    passwordHash: string;
}

export type UpdateUser = Partial<CreateUser>;
