import { Injectable } from "@nestjs/common";
import { SecurityConfig } from "src/security/security.config";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { Config } from "src/misc/config.enum";

@Injectable()
export class SecurityService {

    options!: SecurityConfig;

    constructor(
        private readonly config: ConfigService,
    ) {
        this.options = this.config.get(Config.SECURITY);
    }

    public sign(payload: string | Buffer | object): string {
        return jwt.sign(payload, this.options.jwtSecret)
    }

    public verify(token: string): jwt.JwtPayload | string {
        return jwt.verify(token, this.options.jwtSecret)
    }

    public decode(token: string): jwt.JwtPayload | string {
        return jwt.decode(token)
    }

}