import { Module } from "@nestjs/common";
import { FilesystemController } from "./filesystem.controller";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { FilesystemConfig } from "./filesystem.config";
import { Config } from "src/misc/config.enum";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from 'uuid'
import { SecurityService } from "src/security/security.service";
import { FilesystemService } from "./filesystem.service";
import { FileProvider } from "./models/File";

const multerDynamicModule = MulterModule.registerAsync({
    useFactory: (configService: ConfigService) => {
        const config: FilesystemConfig = configService.get(Config.FILESYSTEM)
        
        return {            
            limits: {
                fileSize: config.maxSize,
            },
            storage: diskStorage({
                filename: (_req: Express.Request, file: Express.Multer.File, callback) => {
                    callback(null, uuidv4() + path.extname(file.originalname))
                },
                destination: (_req: Express.Request, file: Express.Multer.File, callback) => {
                    let randSeed = (Math.round(Math.random() * 8192)).toString(16)
                    const dirname = path.resolve(config.destination, "0".repeat(4 - randSeed.length) + randSeed)
                    if (!fs.existsSync(dirname)) {
                        fs.mkdirSync(dirname, { recursive: true })
                    }
                    file.path = randSeed;
                    callback(null, config.destination + "/" + randSeed)
                },
            })
        }
    },
    inject: [ConfigService],
    imports: [ConfigModule]
})

@Module({
    imports: [multerDynamicModule],
    controllers: [
        FilesystemController
    ],
    providers: [SecurityService, FilesystemService, FileProvider],
})
export class FilesystemModule { }