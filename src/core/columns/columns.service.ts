import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from '../base/id.type';
import { Column } from './columns.entity';
import { ColumnItem, CreateColumn, UpdateColumn } from './columns.item';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(Column)
        private readonly columns: Repository<Column>,
    ) { }


    public async findAll(userId: ID): Promise<ColumnItem[]> {
        const columns = await this.columns
            .find({ where: { user: { id: userId } } });
        return columns;
    }


    public async findById(id: ID): Promise<ColumnItem | null> {
        const column = await this.columns
            .findOneBy({ id });
        return column;
    }


    public async create(data: CreateColumn): Promise<ColumnItem> {
        const column = new Column();
        Object.assign(column, data);

        return await this.columns
            .save(column);
    }


    public async update(id: ID, data: UpdateColumn): Promise<ColumnItem> {
        const column = await this.columns
            .findOneBy({ id });

        Object.assign(column, data);

        return await this.columns
            .save(column);
    }


    public async delete(id: ID): Promise<void> {
        await this.columns
            .delete({ id });
    }
}
