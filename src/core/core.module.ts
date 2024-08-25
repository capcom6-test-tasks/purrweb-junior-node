import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [UsersModule, ColumnsModule],
  exports: [UsersModule],
})
export class CoreModule { }
