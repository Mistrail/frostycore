import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Response, UploadedFile } from "@nestjs/common";
import { UserPayloadDto } from "src/auth/dto/user.payload.dto";
import { Access, User } from "src/security/security.decorators";
import { UploadFile } from "./filesystem.decorators";
import { FilesystemUploadDto } from "./dto/filesystem.upload.dto";
import { Modules } from "src/misc/modules.enum";
import { Roles } from "src/misc/roles.enum";
import { FilesystemService } from "./filesystem.service";
import { FilesystemUpdateDto } from "./dto/filesystem.update.dto";
import * as path from "path"
import { Express } from "express";
import { ApiOperation } from "@nestjs/swagger";

@Controller('upload')
export class FilesystemController {

    constructor(private service: FilesystemService) { }

    @Post()
    @Access({ moduleType: Modules.WORKBENCH, role: Roles.ADMIN })
    @UploadFile()
    upload(
        @User() user: UserPayloadDto,
        @Body() fields: FilesystemUploadDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<FilesystemUpdateDto> {
        return this.service.add(file, user, fields);
    }

    @Delete()
    @Access({ moduleType: Modules.WORKBENCH, role: Roles.ADMIN })
    remove(@Body('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.service.remove(id)
    }

    @Get(":id")
    async getFile(
        @Param('id') id: number,
        @Response() res
    ): Promise<void> {
        const filePath = await this.service.getFile(id);
        const pathFile = path.resolve(filePath);
        res.sendFile(pathFile)
    }

}
