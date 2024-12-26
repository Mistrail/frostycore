import { Provider } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { SequelizeOptions, Sequelize } from "sequelize-typescript"
import { Role } from "../auth/models/Role"
import { User } from "../auth/models/User"
import { File } from "../filesystem/models/File"
import { Config } from "../misc/config.enum"
import { ProviderNames } from "../misc/provider.enum"

const models = [User, Role, File];

const sequelizeProvider: Provider = {
    provide: ProviderNames.SEQUELIZE,
    useFactory: (config: ConfigService) => {
        const options: SequelizeOptions = config.get<SequelizeOptions>(Config.SEQUELIZE)
        const sequelize = new Sequelize(options)
        sequelize.addModels(models)
        sequelize.sync();
    },
    inject: [ConfigService]
}

export default [sequelizeProvider]