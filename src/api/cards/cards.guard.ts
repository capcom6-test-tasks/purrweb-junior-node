import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CardsService } from 'src/core/cards/cards.service';
import { ColumnItem } from 'src/core/columns/columns.item';
import { CARD_ID_PARAM } from './cards.const';

@Injectable()
export class CardsGuard implements CanActivate {

  constructor(
    private readonly cardsService: CardsService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const column = request.column as ColumnItem;
    if (!column) {
      return false;
    }

    const cardId = request.params[CARD_ID_PARAM];
    if (!cardId) {
      throw new Error('Card id not found');
    }

    return this.cardsService.findById(cardId)
      .then(card => {
        // if (!card) {
        //   throw new NotFoundException('Card not found');
        // }

        request.card = card;

        return card?.columnId === column.id;
      });
  }
}
