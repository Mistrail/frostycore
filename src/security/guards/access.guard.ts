import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, mixin } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Observable } from "rxjs"
import { Config } from "src/misc/config.enum"
import { Modules } from "src/misc/modules.enum"
import { Roles } from "src/misc/roles.enum"
import { SecurityConfig } from "../security.config"
import { SecurityService } from "../security.service"
import { Errors } from "src/misc/errors.enum"

export type UserGuardType = {
    role: Roles
    module: Modules
    moduleId?: number
}
    
export const AccessGuard = (params?: UserGuardType) => {

    @Injectable()
    class UserGuard implements CanActivate {

        config: SecurityConfig

        constructor(
            public readonly configService: ConfigService,
            public readonly securityService: SecurityService,
        ){
            this.config = this.configService.get(Config.SECURITY)
        }
        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const token = context.switchToHttp().getRequest().headers[this.config.tokenHeader.toLowerCase()] || null;
            if(!token)  throw new HttpException(Errors.ERR_USER_NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
            const verified = this.securityService.verify(token);
            const roles: UserGuardType[] = verified['roles'];            
            const accessible = roles.find(item => item.module === params.module && item.role === params.role)
            if(!accessible)  throw new HttpException(Errors.ERR_USER_NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
            return true
        }

    }
    const guard = mixin(UserGuard)
    return guard
}