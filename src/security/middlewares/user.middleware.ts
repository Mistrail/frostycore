import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Config } from "src/misc/config.enum";
import { SecurityConfig } from "../security.config";
import { SecurityService } from "../security.service";

@Injectable()
export class UserMiddleware implements NestMiddleware {

    constructor(
        private readonly config: ConfigService,
        private readonly security: SecurityService,
    ) {

    }

    use(req: any, _res: any, next: (error?: Error | any) => void) {
        const headers = req.headers;
        const config: SecurityConfig = this.config.get(Config.SECURITY)
        const token = headers[config.tokenHeader.toLowerCase()]
        try {
            req.User = this.security.verify(token);
        } catch (ex) {
            req.User = null
        }
        next();
    }
}