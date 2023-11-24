export class BillItem {
  constructor(
    public id: string,
    public billId: string,
    public productId: string,
    public price: number,
  ) {}
}
