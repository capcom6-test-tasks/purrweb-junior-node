import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ColumnItem } from "src/core/columns/columns.item";

export const Column = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): ColumnItem => {
        return ctx.switchToHttp().getRequest().column;
    },
);
