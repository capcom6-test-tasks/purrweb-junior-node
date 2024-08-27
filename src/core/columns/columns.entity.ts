import { Column as DbColumn, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { ID } from "../base/id.type";
import { Card } from "../cards/cards.entity";
import { User } from "../users/user.entity";

@Entity('columns')
export class Column extends BaseEntity {
    @DbColumn()
    position: number;

    @DbColumn()
    title: string;

    @DbColumn({ nullable: true })
    color?: string;

    @DbColumn()
    userId: ID;
    @ManyToOne(() => User, user => null)
    user: User;

    @OneToMany(() => Card, card => card.column)
    cards: Card[];
}