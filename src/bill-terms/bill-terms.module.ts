import { Module } from '@nestjs/common';
import { BillTermController } from './bill-terms.controller';
import { BillTermService } from './bill-terms.service';
import { BillModule } from 'src/bill/bill.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [BillModule, ProductModule],
  controllers: [BillTermController],
  providers: [BillTermService],
})
export class BillTermModule {}
