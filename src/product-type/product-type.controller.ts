import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities/product-type.entity';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) { }

  @Post()
  async create(@Body() createProductTypeDto: CreateProductTypeDto): Promise<ProductType> {
    return this.productTypeService.create(createProductTypeDto);
  }

  @Get()
  findAll() {
    return this.productTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductTypeDto: UpdateProductTypeDto) {
    return this.productTypeService.update(id, updateProductTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productTypeService.remove(id);
  }
}
