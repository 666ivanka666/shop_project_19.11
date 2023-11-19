import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './type';
import { IdDto } from 'src/common/decorator';
import { CategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  addCategory(@Body() body: CategoryDto): { id: string } {
    const generatedId = this.categoryService.insertCategory(body.name);
    return { id: generatedId };
  }

  @Get()
  getAllCategories(): Category[] {
    return this.categoryService.getCategory();
  }

  @Get(':id')
  getCategoryById(@Param() params: IdDto): Category {
    return this.categoryService.getSingleCategory(params.id);
  }

  @Put(':id')
  updateCategory(@Param() params: IdDto, @Body() body: CategoryDto): Category {
    const { id } = params;
    return this.categoryService.updateCategory(id, body.name);
  }

  @Delete(':id')
  deleteCategoryById(@Param() params: IdDto): { message: string } {
    return this.categoryService.deleteCategory(params.id);
  }
}
