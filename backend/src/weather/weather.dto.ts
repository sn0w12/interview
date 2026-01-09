import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetWeatherDTO {
  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsOptional()
  @IsString()
  @IsIn(['metric', 'us'])
  unitGroup?: 'metric' | 'us';
}
