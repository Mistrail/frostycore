import { BelongsTo, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../../auth/models/User";
import { Provider } from "@nestjs/common";
import { Providers } from "src/misc/provider.enum";
import { Item } from "./Item";
import { ExtModel } from "../../database/ExtModel";
import { registerModel } from "../../database/database.utils";

@Table({
    paranoid: true,
    timestamps: true
})
export class Store extends ExtModel{
    @BelongsTo(() => User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user: User

    @HasMany(() => Item, {
        foreignKey: 'itemId'
    })
    items?: Item[]
}

export const StoreProvider: Provider = {
    provide: Providers.MODEL_STORE,
    useValue: Store
}

registerModel(Store)