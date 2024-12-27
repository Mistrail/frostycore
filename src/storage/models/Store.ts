import { BelongsTo, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../../auth/models/User";
import { Provider } from "@nestjs/common";
import { ProviderNames } from "src/misc/provider.enum";
import { Item } from "./Item";

@Table({
    paranoid: true,
    timestamps: true
})
export class Store extends Model{
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
    provide: ProviderNames.MODEL_STORE,
    useValue: Store
}