import { registerAs } from "@nestjs/config";
import { Config } from "./misc/config.enum";

export type AppConfig = {
    forceSync: boolean
    alterSync: boolean
    debugMode: boolean
    syncLogging: boolean
}

export default registerAs(
    Config.APP,
    () => ({
        forceSync: process.env.APP_FORCE_SYNC_DB === "On" || false,
        alterSync: process.env.APP_ALTER_SYNC_DB === "On" || false,
        debugMode: process.env.APP_DEBUG_MODE === "On" ? console.log : false,
        syncLogging: process.env.APP_LOGGING_SYNC_DB === "On" ? console.log : false,        
    })
)