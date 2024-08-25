import { Expose } from "class-transformer";

export class User {
    @Expose()
    id: number;
    @Expose()
    email: string;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;

    constructor(source: User) {
        Object.assign(this, source);
    }
}