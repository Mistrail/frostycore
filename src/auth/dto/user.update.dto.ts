import { ApiProperty } from "@nestjs/swagger"

export class UserUpdateDto {
    email?: string
    password?: string
}