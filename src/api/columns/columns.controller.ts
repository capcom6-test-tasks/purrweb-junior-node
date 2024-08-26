import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ColumnsService } from 'src/core/columns/columns.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ID } from 'src/core/base/id.type';
import { UsersGuard } from '../users/users.guard';
import { ColumnDto } from './columns.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class ColumnsController {
    constructor(
        private readonly columnsService: ColumnsService
    ) { }

    @Get()
    @UseGuards(UsersGuard)
    async findAll(@Param('userId') userId: ID): Promise<ColumnDto[]> {
        const columns = await this.columnsService.findAll(userId);

        return columns.map(column => new ColumnDto(column));
    }
}
