import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ColumnsService } from 'src/core/columns/columns.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ID } from 'src/core/base/id.type';
import { UsersGuard } from '../users/users.guard';
import { ColumnDto, PatchColumnDto, PostColumnDto } from './columns.dto';
import { CreateColumn, UpdateColumn } from 'src/core/columns/column.dto';
import { COLUMN_ID_PARAM } from './columns.const';
import { ColumnsGuard } from './columns.guard';
import { User } from '../auth/decorators/user.decorator';
import { UserItem } from 'src/core/users/user.dto';

@Controller()
@UseGuards(JwtAuthGuard, UsersGuard)
export class ColumnsController {
    constructor(
        private readonly columnsService: ColumnsService
    ) { }

    @Get()
    async findAll(@Param('userId') userId: ID): Promise<ColumnDto[]> {
        const columns = await this.columnsService.findAll(userId);

        return columns.map(column => new ColumnDto(column));
    }

    @Get(`:${COLUMN_ID_PARAM}`)
    @UseGuards(ColumnsGuard)
    async findOne(@Param(COLUMN_ID_PARAM) columnId: ID): Promise<ColumnDto> {
        const column = await this.columnsService.findById(columnId);

        return new ColumnDto(column);
    }

    @Post()
    async create(@User() user: UserItem, @Body() body: PostColumnDto): Promise<ColumnDto> {
        const column = await this.columnsService.create({ ...body, userId: user.id });

        return new ColumnDto(column);
    }

    @Patch(`:${COLUMN_ID_PARAM}`)
    @UseGuards(ColumnsGuard)
    async update(@User() user: UserItem, @Param(COLUMN_ID_PARAM) columnId: ID, @Body() body: PatchColumnDto): Promise<ColumnDto> {
        const column = await this.columnsService.update(columnId, { ...body });

        return new ColumnDto(column);
    }

    @Delete(`:${COLUMN_ID_PARAM}`)
    @UseGuards(ColumnsGuard)
    @HttpCode(204)
    async delete(@Param(COLUMN_ID_PARAM) columnId: ID): Promise<void> {
        await this.columnsService.delete(columnId);
    }
}
