import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryDto } from './dto';
import { Subcategory } from './type';
import { IdDto } from 'src/common/decorator';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  addSubcategory(@Body() body: SubcategoryDto): { id: string } {
    const generatedId = this.subcategoryService.insertSubcategory(
      body.name,
      body.categoryId,
    );
    return { id: generatedId };
  }
  @Get()
  getAllSubcategory(): Subcategory[] {
    return this.subcategoryService.getSubcategory();
  }

  @Get(':id')
  getSubcategoryById(@Param() params: IdDto): Subcategory {
    return this.subcategoryService.getSingleSubcategory(params.id);
  }

  @Put(':id')
  updateSubcategory(
    @Param() params: IdDto,
    @Body() body: SubcategoryDto,
  ): Subcategory {
    const { id } = params;
    return this.subcategoryService.updateSubcategory(
      id,
      body.name,
      body.categoryId,
    );
  }
  @Delete(':id')
  deleteSubcategoryById(@Param() params: IdDto): { message: string } {
    return this.subcategoryService.deleteSubcategory(params.id);
  }
}
