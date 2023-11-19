import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto';
import { Customer } from './type';
import { IdDto } from 'src/common/decorator';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  addCustomer(@Body() body: CustomerDto): { id: string } {
    const generatedId = this.customerService.insertCustomer(
      body.firstName,
      body.lastName,
      body.cityId,
    );
    return { id: generatedId };
  }
  @Get()
  getCustomer(): Customer[] {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  getCustomerById(@Param() params: IdDto): Customer {
    return this.customerService.getSingleCustomer(params.id);
  }

  @Put(':id')
  updateCustomer(@Param() params: IdDto, @Body() body: CustomerDto): Customer {
    const { id } = params;
    return this.customerService.updateCustomer(
      id,
      body.firstName,
      body.lastName,
      body.cityId,
    );
  }
  @Delete(':id')
  deleteCustomerById(@Param() params: IdDto): { message: string } {
    return this.customerService.deleteCustomer(params.id);
  }
}
