import { EntityTypes } from "../entityTypes.enum"

export class FilesystemCreateDto {
        entityId: number
        entityType: EntityTypes
        filePath: string
        original: string
        mimeType: string
        userId: number
        size: number
    }