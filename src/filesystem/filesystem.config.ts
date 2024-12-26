import { registerAs } from "@nestjs/config"
import { Config } from "src/misc/config.enum"
import * as dotenv from "dotenv"
dotenv.config()

export type FilesystemConfig = {
    allowedMimetypes: string[],
    maxSize: number,
    uploadName: string,
    destination?: string,    
}

const config: FilesystemConfig = {
    allowedMimetypes: process.env.FILESYSTEM_ALLOWED_MEMTYPES.split(","),
    maxSize: Number(process.env.FILESYSTEM_MAX_SIZE),
    uploadName: process.env.FILESYSTEM_UPLOAD_NAME,
    destination: process.env.FILESYSTEM_DESTINATION,
}

export default registerAs(Config.FILESYSTEM, () => config)