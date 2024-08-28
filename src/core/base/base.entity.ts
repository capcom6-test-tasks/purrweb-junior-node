import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ID } from "./id.type";

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: ID;
    // @Column({ unique: true })
    // extId: string;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
