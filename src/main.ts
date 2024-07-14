import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const initialPort = configService.get<number>('port') || 3000;
  app.useGlobalPipes(new ValidationPipe());

  const port = await initialPort;
  await app.listen(port);
  const appUrl = `http://localhost:${port}`;
  console.log(`Application is running on: ${appUrl}`);
}
bootstrap();
