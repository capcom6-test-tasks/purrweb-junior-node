import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CommentItem } from "src/core/comments/comments.item";

export const Comment = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): CommentItem => {
        return ctx.switchToHttp().getRequest().comment;
    },
);
