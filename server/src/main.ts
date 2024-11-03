import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { mkdirSync } from 'fs';
import serverlessExpress from '@vendia/serverless-express';
import { Handler, Context, Callback, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

let server: Handler;
export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyResult> => {
  if (!server) {
    server = await bootstrap();
  }

  const response = await server(event, context, callback);

  // Ensure CORS headers are included in every response
  if (!response.headers) response.headers = {};
  response.headers['Access-Control-Allow-Origin'] = 'https://firfir-tera.vercel.app';
  response.headers['Access-Control-Allow-Credentials'] = 'true';
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, DELETE';

  return response;
};


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const uploadsDir = path.join(__dirname, '..', 'server', 'tmp', 'uploads');
  mkdirSync(uploadsDir, { recursive: true }); 
  app.enableCors(
    {
  origin: 'https://firfir-tera.vercel.app',
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
