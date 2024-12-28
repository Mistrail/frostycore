import { Provider } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { SequelizeOptions, Sequelize } from "sequelize-typescript"
import { Config } from "../misc/config.enum"
import { Providers } from "../misc/provider.enum"
import { getRegisteredModels } from "./database.utils"

const sequelizeProvider: Provider = {
    provide: Providers.SEQUELIZE,
    useFactory: (config: ConfigService) => {
        const options: SequelizeOptions = config.get<SequelizeOptions>(Config.SEQUELIZE)
        const sequelize = new Sequelize(options)
        sequelize.addModels(getRegisteredModels())
        sequelize.query('SET FOREIGN_KEY_CHECKS=0')
            .then(async () => {
                await sequelize.sync({force: true})
                await sequelize.query('SET FOREIGN_KEY_CHECKS=1')
            })
        return sequelize
    },    
    inject: [ConfigService]
}



export default [sequelizeProvider]