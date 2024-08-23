import { Column as DbColumn, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { Card } from "../cards/card.entity";
import { User } from "../users/user.entity";

@Entity('columns')
export class Column extends BaseEntity {
    @DbColumn()
    position: number;

    @DbColumn()
    title: string;

    @DbColumn()
    color: string;

    @ManyToOne(() => User, user => null)
    user: User;

    @OneToMany(() => Card, card => card.column)
    cards: Card[];
}