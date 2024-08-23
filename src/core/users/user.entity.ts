import { BaseEntity } from "src/db/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;
}