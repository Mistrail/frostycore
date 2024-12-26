import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, mixin } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Observable } from "rxjs"
import { Config } from "src/misc/config.enum"
import { Modules } from "src/misc/modules.enum"
import { Roles } from "src/misc/roles.enum"
import { SecurityConfig } from "../security.config"
import { SecurityService } from "../security.service"
import { Errors } from "src/misc/errors.enum"
import { UserPayloadDto } from "src/auth/dto/user.payload.dto"

export type UserGuardType = {
    role: Roles
    moduleType: Modules
    moduleId?: number
}

export const AccessGuard = (params?: UserGuardType | UserGuardType[]) => {

    @Injectable()
    class UserGuard implements CanActivate {

        config: SecurityConfig

        verifyRoles(roles: UserGuardType[]): boolean {
            let accessible = true;
            if (roles) {
                if (params) {
                    if (!Array.isArray(params)) {
                        params = [params];
                    }
                    params.forEach(param => {
                        if (!accessible) return;
                        accessible = !!roles.find((item: UserGuardType) => item.moduleType === param.moduleType && item.role === param.role)
                    })
                }
            }

            return accessible
        }

        constructor(
            public readonly configService: ConfigService,
            public readonly securityService: SecurityService,
        ) {
            this.config = this.configService.get(Config.SECURITY)
        }
        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const token = context.switchToHttp().getRequest().headers[this.config.tokenHeader.toLowerCase()] || null;
            if (!token) throw new HttpException(Errors.ERR_USER_NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
            let verified: UserPayloadDto;

            try {
                verified = this.securityService.verify(token) as UserPayloadDto
            } catch (ex) {
                throw new HttpException(Errors.ERR_TOKEN_EXPIRED, HttpStatus.FORBIDDEN);
            }

            if (!this.verifyRoles(verified.roles)) {
                throw new HttpException(Errors.ERR_NOT_ENOUGHT_RIGHTS, HttpStatus.FORBIDDEN);
            }

            return true

        }

    }
    const guard = mixin(UserGuard)
    return guard
}