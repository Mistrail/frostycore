import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from "@nestjs/common";
import { AppAuth } from "../security/security.decorators";
import { StorageService } from "./storage.service";
import { ItemCreateDto } from "./dto/item.create.dto";
import { Item } from "./models/Item";
import { List } from "src/misc/list";
import { FilterDto } from "./dto/filter.dto";
import { PropertyValueUpdateDto } from "./dto/propertyValue.update.dto";
import { ItemUpdateDto } from "./dto/item.update.dto";
import { ApiOperation } from "@nestjs/swagger";

@AppAuth()
@Controller('items')
export class ItemController {

    constructor(private readonly service: StorageService) { }

    @ApiOperation({ summary: 'Создать  товар на складе' })
    @Post('new')
    createOne(@Body() fields: ItemCreateDto): Promise<Item> {
        return this.service.createItem(fields)
    }

    @ApiOperation({ summary: 'Поиск товаров на складе' })
    @Get('search')
    getList(s: string): Promise<List<Item>> {
        return this.service.searchItems(s)
    }

    @ApiOperation({ summary: 'Список товаров по ууказанному фильтру' })
    @Get('list')
    search(@Query() filter?: FilterDto[]): Promise<List<Item>> {
        return this.service.getItems(filter)
    }

    @ApiOperation({ summary: 'Получить товар по ИД' })
    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number): Promise<Item> {
        return this.service.getItem(id)
    }

    @ApiOperation({ summary: 'Обновить информацию о товаре' })
    @Put(':id')
    updateOne(@Param('id', ParseIntPipe) id: number, @Body() fields: ItemUpdateDto): Promise<Item> {
        return this.service.updateItem(id, fields)
    }

    @ApiOperation({ summary: 'Обновить свойства товара' })
    @Patch(':id')
    updateProps(@Param('id', ParseIntPipe) id: number, @Body() props: PropertyValueUpdateDto[]): Promise<Item> {
        return this.service.upateItemProps(id, props)
    }

    @ApiOperation({ summary: 'Удалить товар' })
    @Delete(':id')
    removeOne(@Param('id', ParseIntPipe) id: number): true {
        return this.service.removeItem(id)
    }

}