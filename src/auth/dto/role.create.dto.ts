import { Modules } from "src/misc/modules.enum";
import { Roles } from "src/misc/roles.enum";

export class RoleCreateDto {
    role: Roles
    moduleType: Modules
    moduleId?: number
}