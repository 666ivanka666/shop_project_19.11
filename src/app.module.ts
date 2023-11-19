import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { CityModule } from './city/city.module';
import { CustomerModule } from './customer/customer.module';
import { CardTypeModule } from './card-type/card-type.module';
import { BillModule } from './bill/bill.module';
import { BillTermsModule } from './bill-terms/bill-terms.module';

@Module({
  imports: [
    CategoryModule,
    SubcategoryModule,
    ProductModule,
    CityModule,
    CustomerModule,
    CarTypeModule,
    BillModule,
    BillTermsModule,
  ],
})
export class AppModule {}
