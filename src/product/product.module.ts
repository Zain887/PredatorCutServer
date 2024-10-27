import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Subcategory]), SubcategoryModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule.forFeature([ProductModule]),ProductService],
})
export class ProductModule { }
