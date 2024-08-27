import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Card } from "../cards/cards.entity";
import { ID } from "../base/id.type";

@Entity('comments')
export class Comment extends BaseEntity {
    @Column({ type: 'text' })
    text: string;

    @Column()
    cardId: ID;
    @ManyToOne(() => Card, card => card.comments)
    card: Card;
}