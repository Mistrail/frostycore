import { registerAs } from "@nestjs/config"
import { Dialect, PoolOptions } from "sequelize"
import { SequelizeOptions } from "sequelize-typescript"
import { Config } from "src/misc/config.enum"
import * as dotenv from "dotenv"
dotenv.config()

const pool: PoolOptions = {
    acquire: Number(process.env.DB_POOL_ACQUIRE),
    idle: Number(process.env.DB_POOL_IDLE),
    min: Number(process.env.DB_POOL_MIN),
    max: Number(process.env.DB_POOL_MAX),
    evict: Number(process.env.DB_POOL_EVICT),
}

const sequelizeOptions: SequelizeOptions = {
    host: process.env.DB_HOST,    
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT as Dialect,
    pool,
    logging: process.env.DB_LOGGING === "On" ? console.log : false,
}

export default registerAs(Config.SEQUELIZE, () => sequelizeOptions)