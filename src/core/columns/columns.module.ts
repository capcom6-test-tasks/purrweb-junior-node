import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './columns.entity';
import { ColumnsService } from './columns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Column])],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule { }
