import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ColumnsService } from 'src/core/columns/columns.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ID } from 'src/core/base/id.type';

@Controller()
@UseGuards(JwtAuthGuard)
export class ColumnsController {
    constructor(
        private readonly columnsService: ColumnsService
    ) { }

    @Get()
    async findAll(@Param('userId') userId: ID): Promise<{}> {
        console.log(userId);

        return {};
    }
}
