import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { Product } from './type';
import { IdDto } from 'src/common/decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addProduct(@Body() body: ProductDto): { id: string } {
    const generatedId = this.productService.insertProduct(
      body.name,
      body.color,
      body.subcategoryId,
    );
    return { id: generatedId };
  }

  @Get()
  getProduct(): Product[] {
    return this.productService.getProduct();
  }

  @Get(':id')
  getProductById(@Param() params: IdDto): Product {
    return this.productService.getSingleProduct(params.id);
  }

  @Put(':id')
  updateProduct(@Param() params: IdDto, @Body() body: ProductDto): Product {
    const { id } = params;
    return this.productService.updateProduct(
      id,
      body.name,
      body.color,
      body.subcategoryId,
    );
  }

  @Delete(':id')
  deleteProductById(@Param() params: IdDto): { message: string } {
    this.productService.deleteProduct(params.id);
    return { message: 'Successfully deleted' };
  }
}
