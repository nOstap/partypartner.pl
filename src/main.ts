import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { logger: console });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  Logger.log(`Partypartner API started running at ${PORT}`, 'main.ts');
}
bootstrap();
