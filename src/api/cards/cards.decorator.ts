import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CardItem } from "src/core/cards/cards.item";

export const Card = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): CardItem => {
        return ctx.switchToHttp().getRequest().card;
    },
);
