import { Module } from "@nestjs/common";
import { CatalogModule } from "./catalog/catalog.module";
import { ElementModule } from "./element/element.module";
import { CartModule } from "./cart/cart.module";
import { OrderModule } from "./order/order.module";
import { CustomerModule } from "./customer/customer.module";
import { SectionModule } from "./section/section.module";

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
    controllers: [],
    providers: [],
})
export class ShopModule { }