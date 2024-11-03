import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { mkdirSync } from 'fs';
import serverlessExpress from '@vendia/serverless-express';
import { Handler, Context, Callback } from 'aws-lambda';

let server: Handler;

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
  // await app.listen(3000);
  await app.init();

  // Use serverlessExpress to create a serverless handler
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}
// bootstrap();
export const handler: Handler = (event: any, context: Context, callback: Callback) => {
  if (!server) {
    bootstrap().then((s) => {
      server = s;
      server(event, context, callback);
    });
  } else {
    server(event, context, callback);
  }
};