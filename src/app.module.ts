import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { CityModule } from './city/city.module';
import { CustomerModule } from './customer/customer.module';
import { BillModule } from './bill/bill.module';
import { CardTypeModule } from './car-type/card-type.module';
import { BillItemModule } from './bill-terms/bill-items.module';

@Module({
  imports: [
    CategoryModule,
    SubcategoryModule,
    ProductModule,
    CityModule,
    CustomerModule,
    CardTypeModule,
    BillModule,
    BillItemModule,
  ],
})
export class AppModule {}
