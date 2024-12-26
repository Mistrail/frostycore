import { EntityTypes } from "../entityTypes.enum"

export class FilesystemUploadDto {
    file: Express.Multer.File | Express.Multer.File[]
    entityId: number
    entityType: EntityTypes
}