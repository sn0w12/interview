import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  BadRequestException,
} from '@nestjs/common';
import axios from 'axios';
import configuration from '../config/configuration';
import { MemoryCacheService } from '../cache/memory-cache.service';

type UnitGroup = 'metric' | 'us';

interface CurrentWeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  timestamp: string;
  icon: string;
}

interface CurrentWeatherResponse {
  source: 'cache' | 'live';
  city: string;
  unitGroup: UnitGroup;
  fetchedAt: string;
  data: CurrentWeatherData;
}

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly apiKey = configuration().visualCrossing.apiKey;
  private readonly ttl = configuration().cache.ttlSeconds;

  constructor(private readonly cache: MemoryCacheService) {}

  private cacheKey(city: string, unitGroup: UnitGroup): string {
    return `weather:${unitGroup.toLowerCase()}:${city.toLowerCase()}`;
  }

  async getCurrentWeather(
    city: string,
    unitGroup: UnitGroup
  ): Promise<CurrentWeatherResponse> {
    const key = this.cacheKey(city, unitGroup);

    // 1) Try cache
    const cached = this.cache.get(key);
    if (cached) {
      this.logger.log(`Cache hit for city: ${city}`);
      return {
        source: 'cache',
        city,
        unitGroup: unitGroup,
        fetchedAt: new Date().toISOString(),
        data: JSON.parse(cached),
      };
    }

    this.logger.log(`Cache miss for city: ${city}`);
    // 2) Fetch live
    try {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        city
      )}?unitGroup=${unitGroup}&include=current&key=${this.apiKey}`;

      const res = await axios.get(url, { timeout: 8000 });
      const data = res.data;

      // naive 404 detection (candidate can improve based on actual API errors)
      if (!data) {
        throw new BadRequestException('City not found');
      }

      const returnData: CurrentWeatherData = {
        temperature: data.currentConditions.temp,
        description: data.currentConditions.conditions,
        humidity: data.currentConditions.humidity,
        windSpeed: data.currentConditions.windspeed,
        timestamp: data.currentConditions.datetime,
        icon: data.currentConditions.icon,
      };

      // write-through cache
      this.cache.set(key, JSON.stringify(returnData), this.ttl);

      return {
        source: 'live',
        city,
        unitGroup: unitGroup,
        fetchedAt: new Date().toISOString(),
        data: returnData,
      };
    } catch (err: any) {
      // Map common axios errors (candidate can expand this)
      const status = err?.response?.status;
      const responseCode = err?.code;

      if (status === 404 || responseCode === 'ERR_BAD_REQUEST') {
        throw new BadRequestException('City not found');
      }
      this.logger.error(
        `Weather fetch failed for ${city}: ${err?.message || err}`
      );
      throw new ServiceUnavailableException('Weather provider unavailable');
    }
  }
}
