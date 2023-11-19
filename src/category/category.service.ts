import { Injectable, NotAcceptableException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './type';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];

  insertCategory(name: string): string {
    const categoryId = uuidv4();
    this.categories.push(new Category(categoryId, name));
    return categoryId;
  }

  getCategory(): Category[] {
    return this.categories;
  }

  getSingleCategory(categoryId: string): Category {
    const [category] = this.findCategory(categoryId);
    return category;
  }

  updateCategory(categoryId: string, name: string): Category {
    const [category] = this.findCategory(categoryId);
    if (name) {
      category.name = name;
    }
    return category;
  }

  deleteCategory(categoryId: string): { message: string } {
    const [, index] = this.findCategory(categoryId);
    this.categories.splice(index, 1);

    return { message: 'Uspješno izbrisano' };
  }

  findCategory(id: string): [Category, number] {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    );
    if (categoryIndex === -1) {
      throw new NotAcceptableException(`Category with ID ${id} not found`);
    }

    return [this.categories[categoryIndex], categoryIndex];
  }
}
