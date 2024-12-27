import { Provider } from "@nestjs/common";
import { BelongsToMany, Model, Table } from "sequelize-typescript";
import { ProviderNames } from "src/misc/provider.enum";
import { Item } from "./Item";
import { PropertyValue } from "./PropertyValue";

@Table({
    paranoid: false,
    timestamps: false,
})
export class Property extends Model {
    @BelongsToMany(() => Item, () => PropertyValue)
    items?: Array<Item & { PropertyValue: PropertyValue }>
}

export const PropertyValueProvider: Provider = {
    provide: ProviderNames.MODEL_PROPERTY,
    useValue: Property
}