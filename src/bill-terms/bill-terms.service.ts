import { Injectable, NotAcceptableException } from '@nestjs/common';
import { BillTerm } from './type';
import { BillService } from 'src/bill/bill.service';
import { ProductService } from 'src/product/product.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BillTermService {
  private billterms: BillTerm[] = [];

  constructor(
    private readonly billService: BillService,
    private readonly productService: ProductService,
  ) {}

  insertBillTerm(billId: string, productId: string, price: number): string {
    const billtermId = uuidv4();
    this.billService.findBill(billId);
    this.productService.findProduct(productId);

    const newBillTerm = new BillTerm(billtermId, billId, productId, price);
    this.billterms.push(newBillTerm);
    return billtermId;
  }

  getBillTerm(): BillTerm[] {
    return this.billterms;
  }

  getSingleBillTerm(billtermId: string): BillTerm {
    const [billterm] = this.findBillTerm(billtermId);
    return billterm;
  }

  updateBillTerm(
    billtermId: string,
    billId: string,
    productId: string,
    price: number,
  ): BillTerm {
    this.billService.findBill(billId);
    this.productService.findProduct(productId);

    const [billterm, index] = this.findBillTerm(billtermId);
    if (billterm) {
      billterm.billId = billId;
    }
    if (productId) {
      billterm.productId = productId;
    }
    if (price) {
      billterm.price = price;
    }
    return billterm;
  }

  deleteBillTerm(billtermId: string) {
    const [, index] = this.findBillTerm(billtermId);
    this.billterms.splice(index, 1);
    return { message: 'Uspjesno obrisano' };
  }

  findBillTerm(id: string): [BillTerm, number] {
    const billtermIndex = this.billterms.findIndex((bill) => bill.id === id);
    if (billtermIndex === -1) {
      throw new NotAcceptableException(`Billterm with ID ${id} not found`);
    }
    return [this.billterms[billtermIndex], billtermIndex];
  }
}
