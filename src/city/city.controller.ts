import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './type';
import { IdDto } from 'src/common/decorator';
import { CityDto } from './dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  addCity(@Body() body: CityDto): { id: string } {
    const generatedId = this.cityService.insertCity(body.name);
    return { id: generatedId };
  }

  @Get()
  getAllCitities(): City[] {
    return this.cityService.getCity();
  }

  @Get(':id')
  getCityById(@Param() params: IdDto): City {
    return this.cityService.getSingleCity(params.id);
  }

  @Put(':id')
  updateCity(@Param() params: IdDto, @Body() body: CityDto): City {
    const { id } = params;
    return this.cityService.updateCity(id, body.name);
  }

  @Delete(':id')
  deleteCityById(@Param() params: IdDto): { message: string } {
    return this.cityService.deleteCity(params.id);
  }
}
