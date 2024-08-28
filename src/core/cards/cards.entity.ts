
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Column as ColumnEntity } from "../columns/columns.entity";
import { Comment } from "../comments/comments.entity";
import { ID } from "../base/id.type";

@Entity('cards')
export class Card extends BaseEntity {
    @Column()
    title: string;
    @Column({ type: 'text' })
    description: string;
    @Column({ nullable: true })
    dueDate?: Date;

    @Column()
    columnId: ID;
    @ManyToOne(() => ColumnEntity, column => column.cards, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' })
    column: ColumnEntity;

    @OneToMany(() => Comment, comment => comment.card)
    comments: Comment[]
}