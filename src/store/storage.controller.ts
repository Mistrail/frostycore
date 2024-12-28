import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from "@nestjs/common";
import { AppAuth } from "../security/security.decorators";
import { StorageService } from "./storage.service";
import { StoreCreateDto } from "./dto/store.create.dto";
import { Store } from "./models/Store";
import { FilterDto } from "./dto/filter.dto";
import { List } from "../misc/list";
import { StoreUpdateDto } from "./dto/store.update.dto";
import { ApiOperation } from "@nestjs/swagger";

@AppAuth()
@Controller('stores')
export class StorageController {

    constructor(private readonly service: StorageService) { }

    @Post('new')
    createOne(@Body() fields: StoreCreateDto): Promise<Store>  {
        return this.service.createStore(fields)
    }

    @Get('list')
    getList(@Query() filter?: FilterDto[]): Promise<List<Store>> {
        return this.service.getStores(filter)
    }

    @Get('search')
    search(s: string): Promise<List<Store>> {
        return this.service.searchStores(s)
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number): Promise<Store>  {
        return this.service.getStore(id)
    }

    @Put(':id')
    updateOne(@Param('id', ParseIntPipe) id: number, @Body() fields: StoreUpdateDto) {
        return this.service.updateStore(id, fields)
    }

    @Delete(':id')
    removeOne(@Param('id', ParseIntPipe) id: number): true {
        return this.service.removeStore(id)
    }

}