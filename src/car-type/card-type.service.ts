import { Injectable, NotAcceptableException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CardType } from './type';

@Injectable()
export class CardTypeService {
  private cardtypes: CardType[] = [];

  insertCardType(name: string): string {
    const cardtypeId = uuidv4();
    this.cardtypes.push(new CardType(cardtypeId, name));
    return cardtypeId;
  }

  getCardType(): CardType[] {
    return this.cardtypes;
  }
  getSingleCardType(cardtypeId: string): CardType {
    const [cardtype] = this.findCardType(cardtypeId);
    return cardtype;
  }

  updateCardType(cardtypeId: string, name: string): CardType {
    const [cardtype] = this.findCardType(cardtypeId);

    if (name) {
      cardtype.name = name;
    }

    return cardtype;
  }

  deleteCardType(cardtypeId: string): { message: string } {
    const [, index] = this.findCardType(cardtypeId);
    this.cardtypes.splice(index, 1);
    return { message: 'Uspijesno izbrisano' };
  }

  findCardType(id: string): [CardType, number] {
    const cardtypeIndex = this.cardtypes.findIndex(
      (cardtype) => cardtype.id === id,
    );
    if (cardtypeIndex === -1) {
      throw new NotAcceptableException(`CardType with ID ${id} not found`);
    }

    return [this.cardtypes[cardtypeIndex], cardtypeIndex];
  }
}
