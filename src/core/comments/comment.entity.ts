import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Card } from "../cards/card.entity";

@Entity('comments')
export class Comment extends BaseEntity {
    @Column({ type: 'text' })
    text: string;

    @ManyToOne(() => Card, card => card.comments)
    card: Card;
}