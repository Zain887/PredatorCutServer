import { Injectable } from '@nestjs/common';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';

@Injectable()
export class ProductCommentService {
  create(createProductCommentDto: CreateProductCommentDto) {
    return 'This action adds a new productComment';
  }

  findAll() {
    return `This action returns all productComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productComment`;
  }

  update(id: number, updateProductCommentDto: UpdateProductCommentDto) {
    return `This action updates a #${id} productComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} productComment`;
  }
}
