import { Module } from "@nestjs/common";
import { StorageController } from "./storage.controller";
import { ItemController } from "./item.controller";
import { StorageService } from "./storage.service";
import { StoreProvider } from "./models/Store";
import { ItemProvider } from "./models/Item";

@Module({
    controllers: [StorageController, ItemController],
    providers: [StorageService, StoreProvider, ItemProvider]
})
export class StorageModule {}