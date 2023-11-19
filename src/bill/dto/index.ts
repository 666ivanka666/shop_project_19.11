import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BillDto {
  @IsString()
  @IsNotEmpty()
  created: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  cardTYpeId: string;
}
