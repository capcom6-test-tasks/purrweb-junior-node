import { Column, PrimaryGeneratedColumn } from "typeorm";
import { ID } from "./id.type";

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: ID;
    // @Column({ unique: true })
    // extId: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
