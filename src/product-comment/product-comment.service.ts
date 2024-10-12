import { Injectable } from '@nestjs/common';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';
import { ProductComment } from './entities/product-comment.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCommentService {
  constructor(
    @InjectRepository(ProductComment)
    private readonly productCommentRepository: Repository<ProductComment>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createComment(productId: string, createProductCommentDto: CreateProductCommentDto): Promise<ProductComment> {
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new Error('Product not found');
    }

    // Create a new comment and link the product via the product object
    const comment = this.productCommentRepository.create({
      ...createProductCommentDto,
      product: product, // Use the product object, not just productId
    });

    return this.productCommentRepository.save(comment);
  }

  async findAll(): Promise<ProductComment[]> {
    return this.productCommentRepository.find({ relations: ['product'] });
  }

  async findCommentsByProductId(productId: string): Promise<ProductComment[]> {
    return this.productCommentRepository.find({
      where: { product: { id: productId } }, // Adjust to use the product relation
      relations: ['product'], // Include product relation if needed
    });
  }

  async findOne(id: string): Promise<ProductComment> {
    const comment = await this.productCommentRepository.findOne({ where: { id }, relations: ['product'] });

    if (!comment) {
      throw new Error(`Product comment with ID ${id} not found`);
    }

    return comment;
  }

  async update(id: string, updateProductCommentDto: UpdateProductCommentDto): Promise<ProductComment> {
    const comment = await this.productCommentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new Error(`Product comment with ID ${id} not found`);
    }

    // Update the comment fields
    Object.assign(comment, updateProductCommentDto);

    return this.productCommentRepository.save(comment);
  }

  async remove(id: string): Promise<void> {
    const comment = await this.productCommentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new Error(`Product comment with ID ${id} not found`);
    }

    await this.productCommentRepository.remove(comment);
  }
}
