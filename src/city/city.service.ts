import { Injectable, NotAcceptableException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { City } from './type';

@Injectable()
export class CityService {
  private cities: City[] = [];

  insertCity(name: string): string {
    const cityId = uuidv4();
    this.cities.push(new City(cityId, name));
    return cityId;
  }

  getCity(): City[] {
    return this.cities;
  }
  getSingleCity(cityId: string): City {
    const [city] = this.findCity(cityId);
    return city;
  }

  updateCity(cityId: string, name: string): City {
    const [city] = this.findCity(cityId);
    if (name) {
      city.name = name;
    }
    return city;
  }

  deleteCity(cityId: string): { message: string } {
    const [, index] = this.findCity(cityId);
    this.cities.splice(index, 1);
    return { message: 'Uspijesno izbrisano' };
  }

  findCity(id: string): [City, number] {
    const cityIndex = this.cities.findIndex((city) => city.id === id);
    if (cityIndex === -1) {
      throw new NotAcceptableException(`City with ID ${id} not found`);
    }

    return [this.cities[cityIndex], cityIndex];
  }
}
