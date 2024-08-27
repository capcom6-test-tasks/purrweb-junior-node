import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsModule } from 'src/core/comments/comments.module';
import { ColumnsModule } from 'src/core/columns/columns.module';

@Module({
  imports: [ColumnsModule, CommentsModule],
  controllers: [CommentsController]
})
export class CommentsApiModule { }
