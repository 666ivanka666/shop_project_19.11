import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Bill } from './type';
import { CustomerService } from 'src/customer/customer.service';
import { CardTypeService } from 'src/car-type/card-type.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BillService {
  private bills: Bill[] = [];
  constructor(
    private readonly customerService: CustomerService,
    private readonly cardTypeService: CardTypeService,
  ) {}

  insertBill(created: string, customerId: string, cardTypeId: string): string {
    const billId = uuidv4();
    this.customerService.findCustomer(customerId);
    this.cardTypeService.findCardType(cardTypeId);

    this.bills.push(new Bill(billId, created, customerId, cardTypeId));
    return billId;
  }

  getBill(): Bill[] {
    return this.bills;
  }

  getSingleBill(billId: string): Bill {
    const [bill] = this.findBill(billId);
    return bill;
  }
  updateBill(
    billId: string,
    created: string,
    customerId: string,
    cardTypeId: string,
  ): Bill {
    this.customerService.findCustomer(customerId);
    this.cardTypeService.findCardType(cardTypeId);

    const [bill] = this.findBill(billId);
    if (created) {
      bill.created = created;
    }
    if (customerId) {
      bill.customerId = customerId;
    }
    if (cardTypeId) {
      bill.cardTypeId = cardTypeId;
    }
    return bill;
  }

  deleteBill(billId: string) {
    const [, index] = this.findBill(billId);
    this.bills.splice(index, 1);
    return { message: 'Uspjesno obrisano' };
  }

  findBill(id: string): [Bill, number] {
    const billIndex = this.bills.findIndex((bill) => bill.id === id);
    if (billIndex === -1) {
      throw new NotAcceptableException(`Bill with ID ${id} not found`);
    }
    return [this.bills[billIndex], billIndex];
  }
}
