import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { CardTypeModule } from 'src/car-type/card-type.module';

@Module({
  imports: [CustomerModule, CardTypeModule],
  controllers: [BillController],
  providers: [BillService],
  exports: [BillService],
})
export class BillModule {}
