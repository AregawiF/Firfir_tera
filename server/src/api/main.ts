import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { mkdirSync } from 'fs';
import { CorsOptions } from 'cors';
import serverlessExpress from '@vendia/serverless-express';
import { Handler, HandlerResponse } from '@netlify/functions';

let serverlessExpressInstance: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const uploadsDir = path.join(__dirname, '..', 'server', 'tmp', 'uploads');
  mkdirSync(uploadsDir, { recursive: true }); 
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.json({ limit: '10mb' }))

  const corsOptions: CorsOptions = {
    origin: "*",  
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  };
   app.enableCors(corsOptions);

  // await app.listen(3000);
  await app.init();

  // Use serverlessExpress to create a serverless handler
  const expressApp = app.getHttpAdapter().getInstance();
  // return serverlessExpress({ app: expressApp });
  serverlessExpressInstance = serverlessExpress({ app: expressApp });

  return serverlessExpressInstance;
}
// bootstrap();


export const handler: Handler = async (event, context) => {
    if (!serverlessExpressInstance) {
        await bootstrap();
    }
    return serverlessExpressInstance(event, context) as Promise<HandlerResponse>;

};