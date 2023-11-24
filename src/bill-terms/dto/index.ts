import { IsNotEmpty, IsString, IsUUID, IsNumber } from 'class-validator';

export class BillItemDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  billId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
