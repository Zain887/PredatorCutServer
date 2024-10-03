import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderImagesModule } from './header-images/header-images.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { ProductCommentModule } from './product-comment/product-comment.module';
import { CartItemModule } from './cart-item/cart-item.module';

// Importing entities
import { Category } from './category/entities/category.entity';
import { HeaderImage } from './header-images/entities/header-image.entity';
import { Product } from './product/entities/product.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart-item/entities/cart-item.entity';
import { ProductComment } from './product-comment/entities/product-comment.entity';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { Subcategory } from './subcategory/entities/subcategory.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
    }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      entities: [HeaderImage, Category, Product, Cart, CartItem, ProductComment, Subcategory],
      synchronize: true,
      logging: ['query', 'error'],
      ssl: {
        rejectUnauthorized: false, // Allow self-signed certificate
      },
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
    SubcategoryModule,
    CartItemModule,
    SubcategoryModule,
  ],
})
export class AppModule { }
