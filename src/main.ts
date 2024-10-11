import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

// Load environment variables from `.env` files
dotenv.config();

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

  // Enable CORS dynamically based on the environment
  const isProduction = process.env.NODE_ENV === 'production';
  const allowedOrigins = isProduction
    ? [process.env.FRONTEND_URL] // Use environment variable for production frontend URL
    : ['http://localhost:3000']; // Set localhost for development

  app.enableCors({
    origin: allowedOrigins, // Accept the correct frontend URLs
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  // Set the port dynamically based on environment variables (Railway sets this automatically in production)
  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
  });
}
bootstrap();
