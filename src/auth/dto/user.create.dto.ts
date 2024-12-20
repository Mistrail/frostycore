import { ApiProperty } from "@nestjs/swagger"

export class UserCreateDto {
    email: string
    password: string
    agreement: boolean
}