import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Subcategory } from './type';
import { CategoryService } from 'src/category/category.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SubcategoryService {
  private subcategories: Subcategory[] = [];

  constructor(private readonly categoryService: CategoryService) {}

  insertSubcategory(name: string, categoryId: string): string {
    const subcategoryId = uuidv4();
    this.categoryService.findCategory(categoryId);

    const newSubcategory = new Subcategory(subcategoryId, name, categoryId);
    return subcategoryId;
  }

  getSubcategory(): Subcategory[] {
    return this.subcategories;
  }

  getSingleSubcategory(subcategoryId: string): Subcategory {
    const [subcategory] = this.findSubcategory(subcategoryId);
    return subcategory;
  }

  updateSubcategory(
    subcategoryId: string,
    name: string,
    categoryId: string,
  ): Subcategory {
    this.categoryService.findCategory(categoryId);

    const [subcategory] = this.findSubcategory(subcategoryId);
    if (name) {
      subcategory.name = name;
    }
    if (categoryId) {
      subcategory.categoryId = categoryId;
    }
    return subcategory;
  }

  deleteSubcategory(subcategoryId: string) {
    const [, index] = this.findSubcategory(subcategoryId);
    this.subcategories.splice(index, 1);
    return { message: 'Uspjesno obrisano' };
  }

  findSubcategory(id: string): [Subcategory, number] {
    const subcategoryIndex = this.subcategories.findIndex(
      (subcategory) => subcategory.id === id,
    );
    if (subcategoryIndex === -1) {
      throw new NotAcceptableException(`Subcategory with ID ${id} not found`);
    }
    return [this.subcategories[subcategoryIndex], subcategoryIndex];
  }
}
