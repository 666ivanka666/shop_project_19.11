import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SubcategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
