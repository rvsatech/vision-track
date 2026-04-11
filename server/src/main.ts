import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // prevent log loss during startup
  });

  app.getHttpAdapter().getInstance().set('trust proxy', 1); // preserve real client IP behind proxies/load balancers

  app.setGlobalPrefix('api'); // standardize route base path

  app.enableVersioning({
    type: VersioningType.URI,
  }); // enable API versioning (v1, v2...)

  app.use(helmet()); // secure HTTP headers
  app.use(compression()); // reduce response size for better latency

  app.use(json({ limit: '1mb' })); // prevent large payload attacks
  app.use(urlencoded({ extended: true, limit: '1mb' })); // handle form payload safely

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3000'],
    credentials: true,
  }); // restrict cross-origin access

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown fields
      forbidNonWhitelisted: true, // reject unexpected data
      transform: true, // auto-convert payload types
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth() // support JWT/Auth headers
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document); // expose interactive API docs

  app.enableShutdownHooks(); // gracefully handle app termination

  await app.listen(process.env.PORT ?? 3003);
  console.log(`SERVER: http://localhost:${process.env.PORT ?? 3003}`);
  console.log(`API DOCS: http://localhost:${process.env.PORT ?? 3003}/docs`);
}
bootstrap();
