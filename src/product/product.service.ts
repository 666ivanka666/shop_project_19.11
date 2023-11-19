import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './type';
import { SubcategoryService } from 'src/subcategory/subcategory.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  constructor(private readonly subcategoryService: SubcategoryService) {}

  insertProduct(name: string, color: string, subcategoryId: string): string {
    const productId = uuidv4();
    this.products.push(new Product(productId, name, color, subcategoryId));
    return productId;
  }

  getProduct(): Product[] {
    return this.products;
  }

  getSingleProduct(productId: string): Product {
    const [product] = this.findProduct(productId);
    return product;
  }

  updateProduct(
    productId: string,
    name: string,
    color: string,
    subcategoryId: string,
  ): Product {
    this.subcategoryService.findSubcategory(subcategoryId);

    const [product] = this.findProduct(productId);
    if (name) {
      product.name = name;
    }
    if (color) {
      product.color = color;
    }
    if (subcategoryId) {
      product.subcategoryId = subcategoryId;
    }
    return product;
  }

  deleteProduct(productId: string) {
    const [, index] = this.findProduct(productId);
    this.products.splice(index, 1);
    return { message: 'Uspješno obrisano' };
  }

  findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return [this.products[productIndex], productIndex];
  }
}
