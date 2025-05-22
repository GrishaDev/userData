require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// const corsOptions = {
//   origin: ['http://localhost:80', process.env.FE_URL],
//   credentials: true,
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
