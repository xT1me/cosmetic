import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { DefaultDataService } from './default-data/default-data.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  const defaultDataService = app.get(DefaultDataService);

  await defaultDataService.createDefaultData();

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:6001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
