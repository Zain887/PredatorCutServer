import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderImagesModule } from './header-images/header-images.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { ProductCommentModule } from './product-comment/product-comment.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { CartItemModule } from './cart-item/cart-item.module';

// Importing entities
import { Category } from './category/entities/category.entity';
import { HeaderImage } from './header-images/entities/header-image.entity';
import { Product } from './product/entities/product.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart-item/entities/cart-item.entity';
import { ProductComment } from './product-comment/entities/product-comment.entity';
import { ProductTypes } from './product-type/entities/product-type.entity';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,           // Use environment variable
      port: +process.env.DATABASE_PORT,           // Convert string to number
      username: process.env.DATABASE_USERNAME,    // Use environment variable
      password: process.env.DATABASE_PASSWORD,    // Use environment variable
      database: process.env.DATABASE_NAME,        // Use environment variable
      entities: [HeaderImage, Category, Product, Cart, CartItem, ProductComment, ProductTypes], // Include all entities
      synchronize: true,                           // Synchronize schema in development
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.UPLOADS_DIR || 'uploads'),
      serveRoot: '/uploads',
    }),
    // Register your feature modules here
    HeaderImagesModule,
    CategoryModule,
    ProductModule,
    CartModule,
    ProductCommentModule,
    ProductTypeModule,
    CartItemModule,
  ],
})
export class AppModule { }
