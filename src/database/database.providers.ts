import { Provider } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { SequelizeOptions, Sequelize } from "sequelize-typescript"
import { Role } from "src/auth/models/Role"
import { User } from "src/auth/models/User"
import { Config } from "src/misc/config.enum"
import { ProviderNames } from "src/misc/provider.enum"

const models = [User, Role];

const sequelizeProvider: Provider = {
    provide: ProviderNames.SEQUELIZE,
    useFactory: (config: ConfigService) => {
        const options: SequelizeOptions = config.get<SequelizeOptions>(Config.SEQUELIZE)
        const sequelize = new Sequelize(options)
        sequelize.addModels(models)
        sequelize.sync({ alter: true, force: true });
    },
    inject: [ConfigService]
}

export default [sequelizeProvider]