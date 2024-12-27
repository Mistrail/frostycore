import { BelongsTo, BelongsToMany, HasMany, Model, Table } from "sequelize-typescript";
import { Store } from "./Store";
import { Provider } from "@nestjs/common";
import { ProviderNames } from "src/misc/provider.enum";
import { Property } from "./Property";
import { PropertyValue } from "./PropertyValue";

@Table({
    paranoid: true,
    timestamps: true
})
export class Item extends Model{
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
    provide: ProviderNames.MODEL_ITEM,
    useValue: Store
}