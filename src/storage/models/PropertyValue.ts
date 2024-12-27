import { Provider } from "@nestjs/common";
import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { ProviderNames } from "src/misc/provider.enum";
import { Item } from "./Item";
import { Property } from "./Property";

@Table({
    paranoid: false,
    timestamps: false,
})
export class PropertyValue extends Model {
    @ForeignKey(() => Item)
    @Column(DataType.INTEGER)
    itemId: number

    @ForeignKey(() => Property)
    @Column(DataType.INTEGER)
    propertyId: number

    @Column(DataType.STRING)
    value: string
}

export const PropertyValueProvider: Provider = {
    provide: ProviderNames.MODEL_PROPERTY_VALUE,
    useValue: PropertyValue
}