import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { CardTypeModule } from 'src/cardtype/cardtype.module';

@Module({
  imports: [CustomerModule, CardTypeModule],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
