import { Injectable, NotAcceptableException } from '@nestjs/common';
import { BillItem } from './type';
import { BillService } from 'src/bill/bill.service';
import { ProductService } from 'src/product/product.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BillItemService {
  private billitems: BillItem[] = [];

  constructor(
    private readonly billService: BillService,
    private readonly productService: ProductService,
  ) {}

  insertBillItem(billId: string, productId: string, price: number): string {
    const billitemId = uuidv4();
    this.billService.findBill(billId);
    this.productService.findProduct(productId);

    const newBillItem = new BillItem(billitemId, billId, productId, price);
    this.billitems.push(newBillItem);
    return billitemId;
  }

  getBillTerm(): BillItem[] {
    return this.billitems;
  }

  getSingleBillItem(billitemId: string): BillItem {
    const [billitem] = this.findBillItem(billitemId);
    return billitem;
  }

  updateBillItem(
    billitemId: string,
    billId: string,
    productId: string,
    price: number,
  ): BillItem {
    this.billService.findBill(billId);
    this.productService.findProduct(productId);

    const [billitem] = this.findBillItem(billitemId);
    if (billId) {
      billitem.billId = billId;
    }
    if (productId) {
      billitem.productId = productId;
    }
    if (price) {
      billitem.price = price;
    }
    return billitem;
  }

  deleteBillItem(billitemId: string) {
    const [, index] = this.findBillItem(billitemId);
    this.billitems.splice(index, 1);
    return { message: 'Uspjesno obrisano' };
  }

  findBillItem(id: string): [BillItem, number] {
    const billitemIndex = this.billitems.findIndex((bill) => bill.id === id);
    if (billitemIndex === -1) {
      throw new NotAcceptableException(`BillItem with ID ${id} not found`);
    }
    return [this.billitems[billitemIndex], billitemIndex];
  }
}
