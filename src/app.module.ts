import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HeaderImagesModule } from './header-images/header-images.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { ProductCommentModule } from './product-comment/product-comment.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Importing entities
import { Category } from './category/entities/category.entity';
import { HeaderImage } from './header-images/entities/header-image.entity';
import { Product } from './product/entities/product.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart-item/entities/cart-item.entity';
import { ProductComment } from './product-comment/entities/product-comment.entity';
import { ProductTypes } from './product-type/entities/product-type.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'predatorCut',
      entities: [HeaderImage, Category, Product, Cart, CartItem, ProductComment, ProductTypes],
      synchronize: process.env.NODE_ENV !== 'production', // Set to false in production
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
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
