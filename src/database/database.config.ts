import { registerAs } from "@nestjs/config"
import { Dialect, PoolOptions, ReplicationOptions, Transaction } from "sequelize"
import { SequelizeOptions } from "sequelize-typescript"
import { Config } from "src/misc/config.enum"

const pool: PoolOptions = {
    acquire: Number(process.env.DB_POOL_ACQUIRE) || 1000,
    idle: Number(process.env.DB_POOL_IDLE) || 1000,
    min: Number(process.env.DB_POOL_MIN) || 1,
    max: Number(process.env.DB_POOL_MAX) || 5,
    evict: Number(process.env.DB_POOL_EVICT) || 1000,
}

const sequelizeOptions: SequelizeOptions = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_HOST) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Mistrail_01!',
    database: process.env.DB_NAME || 'frostycore',
    dialect: (process.env.DB_DIALECT || 'mysql') as Dialect,
    pool,
    logging: process.env.DB_LOGGING === "On" ? console.log : false,
}

export default registerAs(Config.SEQUELIZE, () => sequelizeOptions)