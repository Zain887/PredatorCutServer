import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Subcategory } from '../subcategory/entities/subcategory.entity'; // Ensure you import the Subcategory entity

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Subcategory) // Ensure SubcategoryRepository is injected
    private subcategoryRepository: Repository<Subcategory>,
  ) { }


  async create(createProductDto: CreateProductDto) {
    const { subcategoryId, categoryId } = createProductDto;

    // Check if the category exists
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new Error('Category not found');
    }

    // Check if the subcategory exists under the selected category
    // In your ProductService
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id: subcategoryId, category: { id: categoryId } },  // Use category as a nested object
    });
    if (!subcategory) {
      throw new Error('Subcategory not found');
    }

    // Create the product (Assuming the rest of the create logic follows)
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);  // Return the updated product
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);  // Delete the product
  }
}
