import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  subcategoryId: string;
}
