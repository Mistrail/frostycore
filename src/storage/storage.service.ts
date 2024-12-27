import { Inject, Injectable } from "@nestjs/common";
import { ProviderNames } from "src/misc/provider.enum";
import { Store } from "./models/Store";
import { Item } from "./models/Item";
import { ItemCreateDto } from "./dto/item.create.dto";
import { List } from "../misc/list";
import { FilterDto } from "./dto/filter.dto";
import { PropertyValueUpdateDto } from "./dto/propertyValue.update.dto";
import { StoreCreateDto } from "./dto/store.create.dto";
import { StoreUpdateDto } from "./dto/store.update.dto";
import { ItemUpdateDto } from "./dto/item.update.dto";

@Injectable()
export class StorageService {
    constructor(
        @Inject(ProviderNames.MODEL_STORE) private stores: typeof Store,
        @Inject(ProviderNames.MODEL_ITEM) private items: typeof Item,
    ) { }

    searchStores(s: string): Promise<List<Store>> {
        throw new Error("Method not implemented.");
    }
    searchItems(s: string): Promise<List<Item>> {
        throw new Error("Method not implemented.");
    }

    removeItem(id: number): true {
        throw new Error("Method not implemented.");
    }
    upateItemProps(id: number, props: PropertyValueUpdateDto[]): Promise<Item> {
        throw new Error("Method not implemented.");
    }
    updateItem(id: number, fields: ItemUpdateDto): Promise<Item> {
        throw new Error("Method not implemented.");
    }
    getItem(id: number): Promise<Item> {
        throw new Error("Method not implemented.");
    }
    getItems(filter: FilterDto[]): Promise<List<Item>> {
        throw new Error("Method not implemented.");
    }
    createItem(fields: ItemCreateDto): Promise<Item> {
        throw new Error("Method not implemented.");
    }

    removeStore(id: number): true {
        throw new Error("Method not implemented.");
    }
    updateStore(id: number, fields: StoreUpdateDto): Promise<Store> {
        throw new Error("Method not implemented.");
    }
    getStore(id: number): Promise<Store> {
        throw new Error("Method not implemented.");
    }
    getStores(filter: { [key: string]: any; }[]): Promise<List<Store>> {
        throw new Error("Method not implemented.");
    }
    createStore(fields: StoreCreateDto): Promise<Store> {
        throw new Error("Method not implemented.");
    }



}