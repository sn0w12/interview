import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  const apiKey = configService.get<string>('visualCrossing.apiKey');
  if (!apiKey) {
    Logger.error(
      'Visual Crossing API key is not set. Please set VC_API_KEY in environment variables.'
    );
    process.exit(1);
  }

  // Enable basic validation (candidate may tweak)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    })
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Weather Wrapper Lite listening on http://localhost:${port}`);
}

bootstrap();
