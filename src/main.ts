import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // CORS configuration
  app.enableCors({
    origin: ['http://localhost:5173', 'https://predatorcut.pages.dev'],  // Allow both localhost and production origin
    credentials: true,  // Allow credentials (cookies, etc.)
  });

  await app.listen(3000);
}
bootstrap();
