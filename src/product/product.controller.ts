import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    console.log('Received Product:', createProductDto);  // Log to verify subcategoryId
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();  // Fetch all products
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);  // Fetch a single product by ID
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id, updateProductDto);  // Update a product
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);  // Delete a product
  }
}
