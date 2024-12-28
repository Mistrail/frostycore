import { Provider } from "@nestjs/common";
import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Providers } from "../../misc/provider.enum";
import { Item } from "./Item";
import { Property } from "./Property";
import { registerModel } from "../../database/database.utils";

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
    provide: Providers.MODEL_PROPERTY_VALUE,
    useValue: PropertyValue
}

registerModel(PropertyValue)