import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from './entities/product-type.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[TypeOrmModule.forFeature([ProductType]),CategoryModule],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
})
export class ProductTypeModule {}
