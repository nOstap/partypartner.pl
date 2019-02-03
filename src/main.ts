import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { logger: console });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
