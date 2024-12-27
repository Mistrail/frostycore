import { Body, Controller, Delete, Get, HttpException, Post, Put, Req } from "@nestjs/common";
import AuthService from "./auth.service";
import { UserUpdateDto } from "./dto/user.update.dto";
import { UserCreateDto } from "./dto/user.create.dto";
import { AppAuth, User } from "src/security/security.decorators";
import { UserPayloadDto } from "./dto/user.payload.dto";
import { Request } from "express";
import { User as UserModel} from "./models/User"
import { ApiBody, ApiOperation, ApiParam } from "@nestjs/swagger";

@AppAuth()
@Controller('auth')
export default class AuthController {

    constructor(private readonly svc: AuthService) { }
    
    @ApiOperation({ summary: 'Получить данные об авторизованном пользователе' })
    @Get()
    whoami(@User() user: UserPayloadDto): Promise<UserModel | null>{
        return this.svc.whoami(user?.id)
    }

    @ApiOperation({ 
        summary: 'Обновить токен пользователя',
        description: 'Обновляет токен во всех сервисах и возвращает новый токен',        
     })
    @Put()
    refresh(@User() user: UserPayloadDto): Promise<string>{
        return this.svc.refresh(user)
    }

    @ApiOperation({ 
        summary: 'Удалить пользователя и все связанные с ним данные',
        description: 'Удаляет аккаунт пользователя, все связанные с ним записи и отменяет регистрацию текущего токена во всех сервисах'
     })
    @Delete()
    async deleteMe(@User() user: UserPayloadDto, @Req() req: Request): Promise<boolean>{
        await this.svc.revoke(req.headers)
        return this.svc.deleteMe(user?.id)
    }

    @ApiOperation({ summary: 'Авторизоваться с помощью логина и пароля' })
    @Post('signin')
    signin(@Body() data: UserUpdateDto): Promise<string> {        
        return this.svc.signin(data);
    }
    
    @ApiOperation({ summary: 'Зарегистрировать нового пользователя' })
    @Post('signup')
    async signup(@Body() data: UserCreateDto): Promise<string> {
        return this.svc.signup(data);
    }

    @ApiOperation({ summary: 'Отменить регистрацию текущего токена на всех сервисах' })
    @Delete('revoke')
    revoke(@Req() req: Request) : true{
        this.svc.revoke(req.headers)
        return true
    }
}