import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CardItem } from 'src/core/cards/cards.item';
import { CommentsService } from 'src/core/comments/comments.service';
import { COMMENT_ID_PARAM } from './comments.const';

@Injectable()
export class CommentsGuard implements CanActivate {

  constructor(
    private readonly commentsService: CommentsService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const card = request.card as CardItem;
    if (!card) {
      return false;
    }

    const commentId = request.params[COMMENT_ID_PARAM];
    if (!commentId) {
      throw new Error('Comment id not found');
    }

    return this.commentsService.findById(commentId)
      .then(comment => {
        if (!comment) {
          throw new NotFoundException('Comment not found');
        }

        request.comment = comment;

        return comment?.cardId === card.id;
      });
  }
}
