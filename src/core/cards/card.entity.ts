import { BaseEntity } from "src/db/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Column as ColumnEntity } from "../columns/column.entity";
import { Comment } from "../comments/comment.entity";

@Entity('cards')
export class Card extends BaseEntity {
    @Column()
    title: string;
    @Column({ type: 'text' })
    description: string;
    @Column({ nullable: true })
    dueDate: Date | null;

    @ManyToOne(() => ColumnEntity, column => column.cards)
    column: ColumnEntity;

    @OneToMany(() => Comment, comment => comment.card)
    comments: Comment[]
}