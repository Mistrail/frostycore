import { Provider } from "@nestjs/common";
import { BelongsToMany, Model, Table } from "sequelize-typescript";
import { Providers } from "../../misc/provider.enum";
import { Item } from "./Item";
import { PropertyValue } from "./PropertyValue";
import { ExtModel } from "../../database/ExtModel";
import { registerModel } from "../../database/database.utils";

@Table({
    paranoid: false,
    timestamps: false,
})
export class Property extends ExtModel {
    @BelongsToMany(() => Item, () => PropertyValue)
    items?: Array<Item & { PropertyValue: PropertyValue }>
}

export const PropertyValueProvider: Provider = {
    provide: Providers.MODEL_PROPERTY,
    useValue: Property
}

registerModel(Property)