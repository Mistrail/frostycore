import { registerAs } from "@nestjs/config"
import { Config } from "src/misc/config.enum"
import * as dotenv from "dotenv"
dotenv.config()

export type SecurityConfig = {
    jwtSecret: string,
    apiKey: string,
    apiHeader: string,
    tokenHeader: string,
    expiresIn: number
}

export default registerAs(Config.SECURITY, (): SecurityConfig => ({
    jwtSecret: process.env.JWT_SECRET,
    apiKey: process.env.JWT_APIKEY,
    apiHeader: process.env.X_API_KEY,
    tokenHeader: process.env.X_USER_TOKEN,
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
}))