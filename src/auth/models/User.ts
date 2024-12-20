import { Provider } from "@nestjs/common";
import { Column, DataType, HasMany, IsEmail, Model, Table } from "sequelize-typescript";
import { ProviderNames } from "src/misc/provider.enum";
import { Role } from "./Role";
import * as crypto from "crypto";

const ALGO: string = 'sha256';
const DIGEST: crypto.BinaryToTextEncoding = 'hex';
const RAND_LENGTH: number = 256;

@Table({
    paranoid: true,
    timestamps: true,
})
export class User extends Model {
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
    async checkPassword(password: string): Promise<boolean>{
        const challenge = User.generatePasshash(password, this.salt);
        return challenge === this.passhash
    }
    @HasMany(() => Role, {
        foreignKey: 'userId'
    })
    roles: Role[]

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
    provide: ProviderNames.MODEL_USER,
    useValue: User
}

