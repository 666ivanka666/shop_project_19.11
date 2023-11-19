import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CardTypeService } from './card-type.service';
import { CardType } from './type';
import { IdDto } from 'src/common/decorator';
import { CardTypeDto } from './dto';

@Controller('cardtype')
export class CardTypeController {
  constructor(private readonly cardtypeService: CardTypeService) {}

  @Post()
  addCardType(@Body() body: CardTypeDto): { id: string } {
    const generatedId = this.cardtypeService.insertCardType(body.name);
    return { id: generatedId };
  }

  @Get()
  getAllCardTypes(): CardType[] {
    return this.cardtypeService.getCardType();
  }

  @Get(':id')
  getCardTypeById(@Param() params: IdDto): CardType {
    return this.cardtypeService.getSingleCardType(params.id);
  }

  @Put(':id')
  updateCardType(@Param() params: IdDto, @Body() body: CardTypeDto): CardType {
    const { id } = params;
    return this.cardtypeService.updateCardType(id, body.name);
  }

  @Delete(':id')
  deleteCardTypeById(@Param() params: IdDto): { message: string } {
    return this.cardtypeService.deleteCardType(params.id);
  }
}
