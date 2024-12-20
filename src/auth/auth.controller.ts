import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Req } from "@nestjs/common";
import AuthService from "./auth.service";
import { UserUpdateDto } from "./dto/user.update.dto";
import { UserCreateDto } from "./dto/user.create.dto";
import { AppAuth, User } from "src/security/security.decorators";
import { UserPayloadDto } from "./dto/user.payload.dto";
import { Request } from "express";

@AppAuth()
@Controller('auth')
export default class AuthController {

    constructor(private readonly svc: AuthService) { }
    
    @Delete()
    async deleteMe(@User() user: UserPayloadDto, @Req() req: Request): Promise<boolean>{
        await this.svc.revoke(req.headers)
        return this.svc.deleteMe(user?.id)
    }

    @Get('whoami')
    whoami(@User() user: UserPayloadDto): Promise<any>{
        return this.svc.whoami(user?.id)
    }

    @Delete('revoke')
    revoke(@Req() req: Request){
        this.svc.revoke(req.headers)
        return true
    }

    @Get('refresh')
    refresh(@User() user: UserPayloadDto){
        return this.svc.refresh(user)
    }

    @Post('signin')
    signin(@Body() data: UserUpdateDto): Promise<string | HttpException> {        
        return this.svc.signin(data);
    }

    @Post('signup')
    async signup(@Body() data: UserCreateDto): Promise<string | HttpException> {
        return this.svc.signup(data);
    }
}