import { Provider } from "@nestjs/common";
import { Column, DataType, HasMany, Model, Scopes, Table } from "sequelize-typescript";
import { Providers } from "src/misc/provider.enum";
import { Role } from "./Role";
import { File } from "../../filesystem/models/File";
import * as crypto from "crypto";
import { Store } from "../../store/models/Store";
import { registerModel } from "../../database/database.utils";
import { ExtModel } from "../../database/ExtModel";
import { Shop } from "../../shop/models/Shop";

const ALGO: string = 'sha256';
const DIGEST: crypto.BinaryToTextEncoding = 'hex';
const RAND_LENGTH: number = 256;

const scopes = {
    PUBLIC: 'PUBLIC',
    SECURITY: 'SECURITY',
}

@Scopes(() => ({
    [scopes.PUBLIC]: { attributes: { exclude: ['salt', 'passhash'] }, include: [{ model: Role, as: 'roles' }] },
    [scopes.SECURITY]: { include: [{ model: Role, as: 'roles' }] },
}))
@Table({
    paranoid: true,
    timestamps: true,
})
export class User extends ExtModel {

    static SCOPES = scopes

    static generatePasshash(password: string, salt: string): string {
        const str = password + salt
        const hash = crypto.createHash(ALGO).update(str)
        return hash.digest(DIGEST)
    }
    static generateSalt(): string {
        const bytes: Buffer = crypto.randomBytes(RAND_LENGTH)
        const hash = crypto.createHash(ALGO).update(bytes)
        return hash.digest(DIGEST)
    }
    async checkPassword(password: string): Promise<boolean> {
        const challenge = User.generatePasshash(password, this.salt);
        return challenge === this.passhash
    }

    @HasMany(() => Role, {
        foreignKey: 'userId'
    })
    roles: Role[]

    @HasMany(() => File, {
        foreignKey: 'userId'
    })
    files?: File[]

    @HasMany(() => Store, {
        foreignKey: 'userId'
    })
    stores?: Store[]

    @HasMany(() => Shop, {
        foreignKey: 'userId'
    })
    shops?: Shop[]

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string

    @Column({
        type: DataType.CHAR(128),
        allowNull: false
    })
    salt: string

    @Column({
        type: DataType.CHAR(128),
        allowNull: false
    })
    passhash: string

    @Column({
        type: DataType.VIRTUAL,
        set: function (password: string) {
            const salt = User.generateSalt();
            const passhash = User.generatePasshash(password, salt);
            this.setDataValue('salt', salt)
            this.setDataValue('passhash', passhash)
        }
    })
    password: string
}

export const UserProvider: Provider = {
    provide: Providers.MODEL_USER,
    useValue: User
}

registerModel(User)