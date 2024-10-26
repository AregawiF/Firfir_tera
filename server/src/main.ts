import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { Patch, ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const uploadsDir = path.join(__dirname, '..', 'server', 'tmp', 'uploads');
  mkdirSync(uploadsDir, { recursive: true }); 
  app.enableCors(
    {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],

}
)
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.json({ limit: '10mb' }))
  await app.listen(3000);
}
bootstrap();