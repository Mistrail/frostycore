import { Provider } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { SequelizeOptions, Sequelize } from "sequelize-typescript"
import { Config } from "../misc/config.enum"
import { Providers } from "../misc/provider.enum"
import { getRegisteredModels } from "./database.utils"
import { AppConfig } from "src/app.config"
import { SyncOptions } from "sequelize"

const sequelizeProvider: Provider = {
    provide: Providers.SEQUELIZE,
    useFactory: (config: ConfigService) => {
        const options: SequelizeOptions = config.get<SequelizeOptions>(Config.SEQUELIZE)
        const appOptions = config.get<AppConfig>(Config.APP)
        const sequelize = new Sequelize(options)
        sequelize.addModels(getRegisteredModels());
        (async () => {
            let fkCheckOff = false;
            if (appOptions.alterSync || appOptions.forceSync) {
                await sequelize.query('SET FOREIGN_KEY_CHECKS=0')
                fkCheckOff = true;
            }

            const syncOptions: SyncOptions = {
                alter: appOptions.alterSync,
                force: appOptions.forceSync,
                logging: appOptions.syncLogging
            }

            await sequelize.sync(syncOptions)

            if (fkCheckOff) {
                await sequelize.query('SET FOREIGN_KEY_CHECKS=1')
            }
        })()
        return sequelize
    },
    inject: [ConfigService]
}



export default [sequelizeProvider]