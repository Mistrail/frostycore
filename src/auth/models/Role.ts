import { Provider } from "@nestjs/common";
import { BelongsTo, Column, Table, DataType, Model } from "sequelize-typescript";
import { ProviderNames } from "src/misc/provider.enum";
import { User } from "./User";
import { Roles } from "src/misc/roles.enum";
import { Modules } from "src/misc/modules.enum";

@Table({
    paranoid: false,
    timestamps: false,
})
export class Role extends Model{

    @Column(DataType.STRING)
    role: Roles

    @Column(DataType.STRING)
    moduleType?: Modules

    @Column(DataType.INTEGER)
    moduleId?: number
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number
    

    @BelongsTo(() => User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user: User
}

export const RoleProvider: Provider = {
    provide: ProviderNames.MODEL_ROLE,
    useValue: Role
}