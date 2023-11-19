export class Bill {
  constructor(
    public id: string,
    public created: string,
    public customerId: string,
    public cardTypeId: string,
  ) {}
}
