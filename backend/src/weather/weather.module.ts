import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { MemoryCacheService } from '../cache/memory-cache.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, MemoryCacheService],
})
export class WeatherModule {}
