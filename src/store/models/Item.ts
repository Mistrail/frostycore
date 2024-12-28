import { BelongsTo, BelongsToMany, HasMany, Model, Table } from "sequelize-typescript";
import { Store } from "./Store";
import { Provider } from "@nestjs/common";
import { Providers } from "src/misc/provider.enum";
import { Property } from "./Property";
import { PropertyValue } from "./PropertyValue";
import { ExtModel } from "../../database/ExtModel";
import { registerModel } from "../../database/database.utils";

@Table({
    paranoid: true,
    timestamps: true
})
export class Item extends ExtModel{
    @BelongsTo(() => Store, {
        foreignKey: 'storeId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    store: Store

    @BelongsToMany(() => Property, () => PropertyValue)
    properties?: Array<Property & {PropertyValue: PropertyValue}>
}

export const ItemProvider: Provider = {
    provide: Providers.MODEL_ITEM,
    useValue: Store
}

registerModel(Item)