import { Provider } from "@nestjs/common";
import { BelongsTo, Model, Table } from "sequelize-typescript";
import { Providers } from "../../misc/provider.enum";
import { User } from "../../auth/models/User";
import { ExtModel } from "../../database/ExtModel";
import { registerModel } from "../../database/database.utils";

@Table({
    paranoid: true,
    timestamps: true
})
export class Shop extends ExtModel{
    @BelongsTo(() => User, {
        foreignKey: 'userId'
    })
    user: User
}

export const ShopProvider: Provider = {
    provide: Providers.MODEL_SHOP,
    useValue: Shop,
}

registerModel(Shop)