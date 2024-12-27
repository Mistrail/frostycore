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

    @ApiOperation({ summary: 'Создать новый склад' })
    @Post('new')
    createOne(@Body() fields: StoreCreateDto): Promise<Store>  {
        return this.service.createStore(fields)
    }

    @ApiOperation({ summary: 'Получить список складов по фильтру' })
    @Get('list')
    getList(@Query() filter?: FilterDto[]): Promise<List<Store>> {
        return this.service.getStores(filter)
    }

    @ApiOperation({ summary: 'Поиск складов' })
    @Get('search')
    search(s: string): Promise<List<Store>> {
        return this.service.searchStores(s)
    }

    @ApiOperation({ summary: 'Получить склад по ИД' })
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number): Promise<Store>  {
        return this.service.getStore(id)
    }

    @ApiOperation({ summary: 'Обновить информацию о складе' })
    @Put(':id')
    updateOne(@Param('id', ParseIntPipe) id: number, @Body() fields: StoreUpdateDto) {
        return this.service.updateStore(id, fields)
    }

    @ApiOperation({ summary: 'Удалить склад' })
    @Delete(':id')
    removeOne(@Param('id', ParseIntPipe) id: number): true {
        return this.service.removeStore(id)
    }

}