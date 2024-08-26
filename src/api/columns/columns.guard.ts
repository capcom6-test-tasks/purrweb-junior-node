import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ColumnsService } from 'src/core/columns/columns.service';
import { UserItem } from 'src/core/users/user.dto';

@Injectable()
export class ColumnsGuard implements CanActivate {

  constructor(
    private readonly columnsService: ColumnsService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserItem;
    if (!user) {
      return false;
    }

    const columnId = request.params.columnId;
    if (!columnId) {
      throw new Error('Column id not found');
    }

    return this.columnsService.findById(columnId)
      .then(column => {
        if (!column) {
          throw new NotFoundException('Column not found');
        }

        return column?.userId == user.id;
      });
  }
}
