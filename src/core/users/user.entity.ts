import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity('users')
export class User extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;
}