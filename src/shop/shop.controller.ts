import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ShopFilterDto } from "./dto/shop.filter.dto";
import { Shop } from "./models/Shop";
import { List } from "../misc/list";
import { Access, AppAuth } from "src/security/security.decorators";
import { Modules } from "src/misc/modules.enum";
import { Roles } from "src/misc/roles.enum";
import { ShopCreateDto } from "./dto/shop.create.dto";
import { ShopUpdateDto } from "./dto/shop.update.dto";
import { ShopService } from "./shop.service";
import { buildFilter } from "src/misc/filter";

@AppAuth()
@Controller('shop')
export class ShopController {

    constructor(private service: ShopService) { }

    @Get('list')
    getlist(@Query() filter: ShopFilterDto): Promise<List<Shop>> {
        return this.service.getList(buildFilter<typeof filter>(filter))
    }

    @Get(':id')
    getshop(@Param('id', ParseIntPipe) id: number): Promise<Shop> {
        return this.service.getOne(id)
    }

    @Access([
        { moduleType: Modules.SHOP, role: Roles.ADMIN },
        { moduleType: Modules.WORKBENCH, role: Roles.ADMIN }
    ])
    @Delete(':id')
    removeshop(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.service.remove(id)
    }

    @Access([
        { moduleType: Modules.SHOP, role: Roles.ADMIN },
        { moduleType: Modules.WORKBENCH, role: Roles.ADMIN }
    ])
    @Post('new')
    addshop(@Body() fields: ShopCreateDto): Promise<Shop> {
        return this.service.addOne(fields)
    }

    @Access([
        { moduleType: Modules.SHOP, role: Roles.ADMIN },
        { moduleType: Modules.WORKBENCH, role: Roles.ADMIN }
    ])
    @Put(':id')
    updateshop(@Param('id', ParseIntPipe) id: number, @Body() fields: ShopUpdateDto): Promise<Shop> {
        return this.service.updateOne(id, fields)
    }
}