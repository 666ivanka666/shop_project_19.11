import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BillTermService } from './bill-terms.service';
import { BillTermDto } from './dto';
import { BillTerm } from './type';
import { IdDto } from 'src/common/decorator';

@Controller('billterm')
export class BillTermController {
  constructor(private readonly billtermService: BillTermService) {}

  @Post()
  addBillTerm(@Body() body: BillTermDto): { id: string } {
    const generatedId = this.billtermService.insertBillTerm(
      body.billId,
      body.productId,
      body.price,
    );
    return { id: generatedId };
  }
  @Get()
  getAllBillTErm(): BillTerm[] {
    return this.billtermService.getBillTerm();
  }

  @Get(':id')
  getBillTermById(@Param() params: IdDto): BillTerm {
    return this.billtermService.getSingleBillTerm(params.id);
  }

  @Put(':id')
  updateBillTerm(@Param() params: IdDto, @Body() body: BillTermDto): BillTerm {
    const { id } = params;
    return this.billtermService.updateBillTerm(
      id,
      body.billId,
      body.productId,
      body.price,
    );
  }
  @Delete(':id')
  deleteBillTermById(@Param() params: IdDto): { message: string } {
    return this.billtermService.deleteBillTerm(params.id);
  }
}
