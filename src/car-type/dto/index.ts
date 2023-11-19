import { IsNotEmpty, IsString } from 'class-validator';

export class CardTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
