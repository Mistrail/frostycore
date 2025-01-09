import { Inject, Injectable } from "@nestjs/common";
import { ShopFilterDto } from "./dto/shop.filter.dto";
import { ShopCreateDto } from "./dto/shop.create.dto";
import { ShopUpdateDto } from "./dto/shop.update.dto";
import { Shop } from "./models/Shop";
import { List } from "../misc/list";
import { Providers } from "src/misc/provider.enum";

@Injectable()
export class ShopService {

    constructor(@Inject(Providers.MODEL_SHOP) private shopModel: typeof Shop) { }

    async updateOne(id: number, fields: ShopUpdateDto): Promise<Shop> {
        let shop = await this.shopModel.findByPk(id);
        if (shop) {
            shop = await shop.update(fields)
        }
        return shop
    }

    addOne(fields: ShopCreateDto): Promise<Shop> {
        return this.shopModel.create({ ...fields }, { isNewRecord: true })
    }
    
    async remove(id: number): Promise<boolean> {
        const shop = await this.shopModel.findByPk(id);
        if (shop) {
            await shop.destroy()
        }
        return true
    }

    getOne(id: number): Promise<Shop> {
        return this.shopModel.findByPk(id)
    }

    getList(filter: ShopFilterDto): Promise<List<Shop>> {
        throw new Error("Method not implemented.");
    }

}