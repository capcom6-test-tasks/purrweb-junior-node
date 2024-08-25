import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ID } from '../base/id.type';
import { ColumnItem, CreateColumn, UpdateColumn } from './column.dto';
import { Column } from './column.entity';

@Injectable()
export class ColumnsService {
    constructor(
        private readonly dataSource: DataSource
    ) { }


    public async findAll(userId: ID): Promise<ColumnItem[]> {
        const columns = await this.dataSource
            .getRepository(Column)
            .find({ where: { user: { id: userId } } });
        return columns;
    }


    public async findById(id: ID): Promise<ColumnItem | null> {
        const column = await this.dataSource
            .getRepository(Column)
            .findOneBy({ id });
        return column;
    }


    public async create(data: CreateColumn): Promise<ColumnItem> {
        const column = new Column();
        Object.assign(column, data);

        return await this.dataSource
            .getRepository(Column)
            .save(column);
    }


    public async update(id: ID, data: UpdateColumn): Promise<ColumnItem> {
        const column = await this.dataSource
            .getRepository(Column)
            .findOneBy({ id });

        Object.assign(column, data);

        return await this.dataSource
            .getRepository(Column)
            .save(column);
    }


    public async delete(id: ID): Promise<void> {
        await this.dataSource
            .getRepository(Column)
            .delete({ id });
    }
}
