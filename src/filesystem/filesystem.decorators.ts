import { applyDecorators, createParamDecorator, UploadedFile, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"

export const UploadFile = (fieldName: string = 'upload') => applyDecorators(UseInterceptors(FileInterceptor(fieldName)));