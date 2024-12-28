import { BelongsTo, Column, DataType, Table } from "sequelize-typescript";
import { EntityTypes } from "../entityTypes.enum";
import { User } from "../../auth/models/User";
import { Provider } from "@nestjs/common";
import { Providers } from "src/misc/provider.enum";
import { ExtModel } from "src/database/ExtModel";
import { registerModel } from "../../database/database.utils";

@Table({
    paranoid: true,
    timestamps: true
})
export class File extends ExtModel {

    @Column(DataType.INTEGER)
    entityId: number

    @Column(DataType.STRING)
    entityType: EntityTypes

    @Column(DataType.STRING)
    filePath: string

    @Column(DataType.STRING)
    original: string

    @Column(DataType.STRING)
    mimeType: string

    @Column(DataType.INTEGER)
    size: number

    @BelongsTo(() => User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user: User

}

export const FileProvider: Provider = {
    provide: Providers.MODEL_FILE,
    useValue: File
}

registerModel(File)
