import { Module } from '@nestjs/common';
import { BillItemController } from './bill-items.controller';
import { BillItemService } from './bill-items.service';
import { BillModule } from 'src/bill/bill.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [BillModule, ProductModule],
  controllers: [BillItemController],
  providers: [BillItemService],
})
export class BillItemModule {}
