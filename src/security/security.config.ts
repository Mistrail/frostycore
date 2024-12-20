import { registerAs } from "@nestjs/config"
import { Config } from "src/misc/config.enum"

export type SecurityConfig = {
    jwtSecret: string,
    apiKey: string,
    apiHeader: string,
    tokenHeader: string,
    expiresIn: number
}

export default registerAs(Config.SECURITY, (): SecurityConfig => ({
    jwtSecret: process.env.JWT_SECRET || 'secret',
    apiKey: process.env.JWT_APIKEY || 'demo',
    apiHeader: process.env.X_API_KEY || 'x-api-key',
    tokenHeader: process.env.X_USER_TOKEN || 'Authorization',
    expiresIn: Number(process.env.X_EXPIRES_IN) || 3600 * 12,
}))