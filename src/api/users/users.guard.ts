import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserItem } from 'src/core/users/user.dto';
import { USER_ID_PARAM } from './users.const';

@Injectable()
export class UsersGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserItem;
    if (!user) {
      return false;
    }

    const userId = request.params[USER_ID_PARAM];
    if (!userId) {
      throw new Error('User id not found');
    }

    return user.id == userId;
  }
}
