import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from "@nestjs/common";
import { AppGuard } from "./guards/app.guard";
import { AccessGuard, UserGuardType } from "./guards/access.guard";

export const AppAuth = () => applyDecorators(UseGuards(AppGuard));
export const Access = (params?: UserGuardType | UserGuardType[]) => applyDecorators(UseGuards(AccessGuard(params)))
export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext ) => {
    return ctx.switchToHttp().getRequest()?.User;
})