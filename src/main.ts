import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import { AppModule } from '@src/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Enable dependency injection for class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FE_ORIGIN,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap().then();
