import { RoleCreateDto } from "./role.create.dto"

export class UserPayloadDto {
    id: number
    roles?: RoleCreateDto[]
}