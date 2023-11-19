import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  cityId: string;
}
