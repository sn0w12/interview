import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherDTO } from './weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getCurrent(@Query() query: GetWeatherDTO) {
    return this.weatherService.getCurrentWeather(
      query.city.trim(),
      query.unitGroup || 'metric'
    );
  }
}
