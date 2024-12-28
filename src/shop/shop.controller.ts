import { Controller, Delete, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ShopFilterDto } from "./dto/shop.filter.dto";
import { Shop } from "./models/Shop";
import { List } from "../misc/list";
import { ApiOperation } from "@nestjs/swagger";
import { Access } from "src/security/security.decorators";
import { Modules } from "src/misc/modules.enum";
import { Roles } from "src/misc/roles.enum";

@Controller('shop')
export class ShopController {

    @Get('list')
    getlist(@Query() filter: ShopFilterDto): Promise<List<Shop>>{
        return
    }

    @Get(':id')
    getshop(@Param('id', ParseIntPipe) id: number): Promise<Shop>{
        return
    }

    @Access({moduleType: Modules.SHOP, role: Roles.ADMIN})
    @Delete(':id')
    removeshop(@Param('id', ParseIntPipe) id: number): Promise<boolean>{
        return
    }

}