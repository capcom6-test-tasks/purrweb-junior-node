import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsModule } from 'src/core/columns/columns.module';

@Module({
  imports: [ColumnsModule],
  controllers: [ColumnsController]
})
export class ColumnsApiModule { }
