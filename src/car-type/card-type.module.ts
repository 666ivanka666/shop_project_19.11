import { Module } from '@nestjs/common';
import { CardTypeController } from './card-type.controller';
import { CardTypeService } from './card-type.service';

@Module({
  controllers: [CardTypeController],
  providers: [CardTypeService],
  exports: [CardTypeService],
})
export class CardTypeModule {}
