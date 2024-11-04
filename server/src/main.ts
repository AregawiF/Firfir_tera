import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { mkdirSync } from 'fs';
import serverlessExpress from '@vendia/serverless-express';
import { Handler, Context, Callback, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const uploadsDir = path.join(__dirname, '..', 'server', 'tmp', 'uploads');
  mkdirSync(uploadsDir, { recursive: true }); 

  app.enableCors(
    {
  origin: '*',
  // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',

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
export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyResult> => {
  if (!server) {
    server = await bootstrap();
  }

  const response = await server(event, context, callback);

  // Manually add CORS headers to each response
  if (!response.headers) response.headers = {};
  response.headers['Access-Control-Allow-Origin'] = '*';
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  response.headers['Access-Control-Allow-Credentials'] = 'true';

  return response;
};