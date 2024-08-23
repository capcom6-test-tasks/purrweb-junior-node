import { BaseEntity } from "src/db/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Card } from "../cards/card.entity";

@Entity('comments')
export class Comment extends BaseEntity {
    @Column({ type: 'text' })
    text: string;

    @ManyToOne(() => Card, card => card.comments)
    card: Card;
}