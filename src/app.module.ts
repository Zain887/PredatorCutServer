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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT'), 10),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false, // Add SSL for production/live
        entities: [HeaderImage, Category, Product, Cart, CartItem, ProductComment, ProductTypes],
        synchronize: true,
      }),
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
export class AppModule {}
