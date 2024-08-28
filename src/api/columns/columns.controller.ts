import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ID } from 'src/core/base/id.type';
import { ColumnsService } from 'src/core/columns/columns.service';
import { UserItem } from 'src/core/users/user.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UsersGuard } from '../users/users.guard';
import { COLUMN_ID_PARAM } from './columns.const';
import { ColumnDto, PatchColumnDto, PostColumnDto } from './columns.dto';
import { ColumnsGuard } from './columns.guard';
import { ColumnItem } from 'src/core/columns/columns.item';
import { Column } from './columns.decorator';
import { ApiTags, ApiBearerAuth, ApiParam, ApiForbiddenResponse, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { USER_ID_PARAM } from '../users/users.const';

@ApiTags('Columns')
@ApiBearerAuth()
@ApiParam({ name: USER_ID_PARAM, description: 'User ID' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@Controller()
@UseGuards(JwtAuthGuard, UsersGuard)
export class ColumnsController {
    constructor(
        private readonly columnsService: ColumnsService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all columns' })
    @ApiOkResponse({ status: 200, type: [ColumnDto] })
    async findAll(@User() user: UserItem): Promise<ColumnDto[]> {
        const columns = await this.columnsService.findAll(user.id);

        return columns.map(column => new ColumnDto(column));
    }

    @Get(`:${COLUMN_ID_PARAM}`)
    @UseGuards(ColumnsGuard)
    @ApiOperation({ summary: 'Get column by ID' })
    @ApiParam({ name: COLUMN_ID_PARAM, description: 'Column ID' })
    @ApiOkResponse({ status: 200, type: ColumnDto })
    @ApiNotFoundResponse({ description: 'Column not found' })
    async findOne(
        @Column() column: ColumnItem
    ): Promise<ColumnDto> {
        return new ColumnDto(column);
    }

    @Post()
    @ApiOperation({ summary: 'Create column' })
    @ApiOkResponse({ status: 201, type: ColumnDto })
    async create(@User() user: UserItem, @Body() body: PostColumnDto): Promise<ColumnDto> {
        const column = await this.columnsService.create({ ...body, userId: user.id });

        return new ColumnDto(column);
    }

    @Patch(`:${COLUMN_ID_PARAM}`)
    @UseGuards(ColumnsGuard)
    @ApiOperation({ summary: 'Update column' })
    @ApiParam({ name: COLUMN_ID_PARAM, description: 'Column ID' })
    @ApiOkResponse({ status: 200, type: ColumnDto })
    @ApiNotFoundResponse({ description: 'Column not found' })
    async update(
        @Column() column: ColumnItem,
        @Body() body: PatchColumnDto
    ): Promise<ColumnDto> {
        const updated = await this.columnsService.update(column.id, { ...body });

        return new ColumnDto(updated);
    }

    @Delete(`:${COLUMN_ID_PARAM}`)
    @UseGuards(ColumnsGuard)
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete column' })
    @ApiParam({ name: COLUMN_ID_PARAM, description: 'Column ID' })
    @ApiNotFoundResponse({ description: 'Column not found' })
    async delete(@Param(COLUMN_ID_PARAM) columnId: ID): Promise<void> {
        await this.columnsService.delete(columnId);
    }
}
