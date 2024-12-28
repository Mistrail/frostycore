import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { FilesystemUpdateDto } from "./dto/filesystem.update.dto";
import { File } from "./models/File";
import { Providers } from "src/misc/provider.enum";
import * as fs from "fs";
import * as path from "path";
import { UserPayloadDto } from "src/auth/dto/user.payload.dto";
import { FilesystemUploadDto } from "./dto/filesystem.upload.dto";
import { FilesystemCreateDto } from "./dto/filesystem.create.dto";
import { Errors } from "src/misc/errors.enum";

@Injectable()
export class FilesystemService {

    constructor(@Inject(Providers.MODEL_FILE) private file: typeof File) { }

    async add(file: Express.Multer.File, user: UserPayloadDto, fields: FilesystemUploadDto): Promise<FilesystemUpdateDto> {
        const dataToInsert: FilesystemCreateDto = {
            entityType: fields.entityType,
            entityId: fields.entityId,
            filePath: file.path,
            userId: user.id,
            original: file.originalname,
            mimeType: file.mimetype,
            size: file.size, 
        }
        try {
            const { id } = await this.file.create(dataToInsert as any, { isNewRecord: true })
            return { ...dataToInsert, id }
        } catch (ex) {
            this.deleteFilePhysically(file.path);
            throw new HttpException(Errors.ERR_INVALID_DATA, HttpStatus.BAD_REQUEST)
        }

    }
    async remove(id: number): Promise<boolean> {
        const file = await this.file.findByPk(id);
        if (file) {
            this.deleteFilePhysically(file.filePath)
            file.destroy({ force: true })
        }
        return true;
    }

    private deleteFilePhysically(filename: string): boolean {
        const fullpath = path.resolve("/" + filename);
        if (fs.existsSync(fullpath)) {
            fs.rmSync(fullpath)
        }
        return true
    }

    async getFile(id: number): Promise<string | null> {
        const file = await this.file.findByPk(id);
        return file?.filePath ?? null
    }

}