import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import { UserProvider } from "./models/User";
import { RoleProvider } from "./models/Role";
import { SecurityService } from "src/security/security.service";

@Module({
    controllers: [AuthController],
    providers: [
        ConfigService, 
        AuthService, 
        UserProvider, 
        RoleProvider,
        SecurityService
    ],
})
export default class AuthModule { }