import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductCommentService } from './product-comment.service';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';

@Controller('product-comment')
export class ProductCommentController {
  constructor(private readonly productCommentService: ProductCommentService) {}

  @Post()
  create(@Body() createProductCommentDto: CreateProductCommentDto) {
    return this.productCommentService.create(createProductCommentDto);
  }

  @Get()
  findAll() {
    return this.productCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCommentDto: UpdateProductCommentDto) {
    return this.productCommentService.update(+id, updateProductCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCommentService.remove(+id);
  }
}
