import { CanActivate, ExecutionContext, HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import { SecurityConfig } from "../security.config";
import { Config } from "src/misc/config.enum";
import { Errors } from "src/misc/errors.enum";

@Injectable()
export class AppGuard implements CanActivate{

    config: SecurityConfig

    constructor(private readonly configService: ConfigService){
        this.config = this.configService.get(Config.SECURITY);
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const appToken = this.getappToken(context.switchToHttp().getRequest().headers)
        if(appToken !== this.config.apiKey){
            throw new HttpException(Errors.ERR_APPLICATION_NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
        }
        return true
    }

    private getappToken(headers): string | null | undefined {
        const headerName = this.config.apiHeader;
        return headers[headerName];
    }
}