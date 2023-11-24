import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BillItemService } from './bill-items.service';
import { BillItemDto } from './dto';
import { BillItem } from './type';
import { IdDto } from 'src/common/decorator';

@Controller('billitem')
export class BillItemController {
  constructor(private readonly billitemService: BillItemService) {}

  @Post()
  addBillItem(@Body() body: BillItemDto): { id: string } {
    const generatedId = this.billitemService.insertBillItem(
      body.billId,
      body.productId,
      body.price,
    );
    return { id: generatedId };
  }
  @Get()
  getAllBillItem(): BillItem[] {
    return this.billitemService.getBillTerm();
  }

  @Get(':id')
  getBillItemById(@Param() params: IdDto): BillItem {
    return this.billitemService.getSingleBillItem(params.id);
  }

  @Put(':id')
  updateBillItem(@Param() params: IdDto, @Body() body: BillItemDto): BillItem {
    const { id } = params;
    return this.billitemService.updateBillItem(
      id,
      body.billId,
      body.productId,
      body.price,
    );
  }
  @Delete(':id')
  deleteBillItemById(@Param() params: IdDto): { message: string } {
    return this.billitemService.deleteBillItem(params.id);
  }
}
