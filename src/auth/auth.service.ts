import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { User } from "./models/User";
import { ProviderNames } from "src/misc/provider.enum";
import { UserUpdateDto } from "./dto/user.update.dto";
import { Errors } from "src/misc/errors.enum";
import { UserCreateDto } from "./dto/user.create.dto";
import { Role } from "./models/Role";
import { Roles } from "src/misc/roles.enum";
import { Modules } from "src/misc/modules.enum";
import { RoleCreateDto } from "./dto/role.create.dto";
import { SecurityService } from "src/security/security.service";
import { UserPayloadDto } from "./dto/user.payload.dto";
import { ConfigService } from "@nestjs/config";
import { Config } from "src/misc/config.enum";
import { SecurityConfig } from "src/security/security.config";

@Injectable()
export default class AuthService {
    constructor(
        private readonly security: SecurityService,
        private readonly config: ConfigService,
        @Inject(ProviderNames.MODEL_USER) private readonly user: typeof User
    ) { }

    async whoami(id?: number): Promise<any> {
        if(id){
            return await this.user.scope('public').findByPk(id);
        }
                
        return null;
    }

    async revoke(headers: unknown): Promise<{ [key: string]: boolean }[] | []> {
        const conf: SecurityConfig = this.config.get(Config.SECURITY)
        const token: string = headers[conf.tokenHeader] || null;
        let dropped = [];
        if (token) {
            //@todo drop token from external services
            dropped.push({ core: true });
        }
        return dropped
    }

    async refresh({ id, roles }: UserPayloadDto): Promise<string> {
        const currentUser = await this.user.findByPk(id);
        if (!currentUser) throw new HttpException(Errors.ERR_INVALID_USER, HttpStatus.BAD_REQUEST)
        return this.security.sign({ id, roles })
    }

    async signup(userCreate: UserCreateDto): Promise<string> {
        const { agreement, ...userData } = userCreate;
        if (!agreement) {
            throw new HttpException(Errors.ERR_AGREEMENT_REQUIRED, HttpStatus.UNAUTHORIZED);
        }

        try {
            const roles: RoleCreateDto[] = [{
                role: Roles.CUSTOMER,
                moduleType: Modules.PERSONAL
            }]
            const options = { isNewRecord: true, include: [{ model: Role, as: 'roles' }] }
            const user = await this.user.create({ ...userData, roles }, options)
            if (!user) {
                throw new HttpException(Errors.ERR_INVALID_LOGINPASS, HttpStatus.UNAUTHORIZED);
            }
            const payload = {
                id: user.id,
                roles
            }
            return this.security.sign(payload);
        } catch (ex) {
            throw new HttpException(Errors.ERR_INVALID_LOGINPASS, HttpStatus.UNAUTHORIZED);
        }
    }

    async signin({ email, password }: UserUpdateDto): Promise<string> {

        try {
            const user = await this.user.findOne({ where: { email } });

            if (!user) {
                throw new HttpException(Errors.ERR_INVALID_LOGINPASS, HttpStatus.UNAUTHORIZED);
            }

            if (!(await user.checkPassword(password))) {
                throw new HttpException(Errors.ERR_INVALID_LOGINPASS, HttpStatus.UNAUTHORIZED);
            }

            const { id, roles } = user

            return this.security.sign({ id, roles })
        } catch (ex) {
            throw new HttpException(Errors.ERR_INVALID_LOGINPASS, HttpStatus.UNAUTHORIZED);
        }

    }

}