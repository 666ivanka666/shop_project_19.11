import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { BillDto } from './dto';
import { Bill } from './type';
import { IdDto } from 'src/common/decorator';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  addBill(@Body() body: BillDto): { id: string } {
    const generatedId = this.billService.insertBill(
      body.created,
      body.customerId,
      body.cardTYpeId,
    );
    return { id: generatedId };
  }
  @Get()
  getAllBill(): Bill[] {
    return this.billService.getBill();
  }

  @Get(':id')
  getBillById(@Param() params: IdDto): Bill {
    return this.billService.getSingleBill(params.id);
  }

  @Put(':id')
  updateBill(@Param() params: IdDto, @Body() body: BillDto): Bill {
    const { id } = params;
    return this.billService.updateBill(
      id,
      body.created,
      body.customerId,
      body.cardTYpeId,
    );
  }
  @Delete(':id')
  deleteBillById(@Param() params: IdDto): { message: string } {
    return this.billService.deleteBill(params.id);
  }
}
