import { Provider } from "@nestjs/common";
import { BelongsTo, Column, Table, DataType } from "sequelize-typescript";
import { Providers } from "../../misc/provider.enum";
import { User } from "./User";
import { Roles } from "../../misc/roles.enum";
import { Modules } from "../../misc/modules.enum";
import { ExtModel } from "../../database/ExtModel";
import { registerModel } from "../../database/database.utils";

@Table({
    paranoid: false,
    timestamps: false,
})
export class Role extends ExtModel {

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
    provide: Providers.MODEL_ROLE,
    useValue: Role
}

registerModel(Role)

console.log()