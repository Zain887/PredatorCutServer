import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from './entities/product-type.entity';
import { Category } from '../category/entities/category.entity'; // Import Category entity

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,

    @InjectRepository(Category) // Inject the Category repository
    private categoryRepository: Repository<Category>,
  ) { }

  async create(createProductTypeDto: CreateProductTypeDto): Promise<ProductType> {
    const { name, categoryId } = createProductTypeDto;
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

    if (!category) {
      throw new Error('Category not found');
    }

    // Check if the ProductType with the same name and categoryId already exists
    const existingProductType = await this.productTypeRepository.findOne({
      where: { name, category: { id: categoryId } },
    });

    if (existingProductType) {
      throw new Error('Product Type with this name already exists in this category');
    }

    const newProductType = this.productTypeRepository.create({ name, category });
    console.log('Saving new ProductType:', newProductType); // Log the entity to confirm
    return await this.productTypeRepository.save(newProductType);
  }




  async findAll(): Promise<ProductType[]> {
    return this.productTypeRepository.find(); // Returns all product types
  }

  async findOne(id: string): Promise<ProductType> {
    return this.productTypeRepository.findOne({ where: { id } }); // Returns a product type by id
  }

  async update(id: string, updateProductTypeDto: UpdateProductTypeDto): Promise<ProductType> {
    await this.productTypeRepository.update(id, updateProductTypeDto);
    return this.productTypeRepository.findOne({ where: { id } }); // Updates the product type
  }

  async remove(id: string): Promise<void> {
    await this.productTypeRepository.delete(id); // Removes a product type by id
  }
}
