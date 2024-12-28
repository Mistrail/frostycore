import { Module } from "@nestjs/common";
import { CatalogModule } from "./modules/catalog/catalog.module";
import { ElementModule } from "./modules/element/element.module";
import { CartModule } from "./modules/cart/cart.module";
import { OrderModule } from "./modules/order/order.module";
import { CustomerModule } from "./modules/customer/customer.module";
import { SectionModule } from "./modules/section/section.module";
import { ShopController } from "./shop.controller";
import { SecurityService } from "src/security/security.service";
import { ShopService } from "./shop.service";
import { ShopProvider } from "./models/Shop";

@Module({
    imports: [
        CatalogModule,
        SectionModule,
        ElementModule,
        CartModule,
        OrderModule,
        CustomerModule
    ],
    exports: [],
    controllers: [ShopController],
    providers: [SecurityService, ShopService, ShopProvider],
})
export class ShopModule { }