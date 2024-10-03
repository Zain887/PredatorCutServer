import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class SubcategoryService {

  constructor(
    @InjectRepository(Subcategory)
    private subCategoryRepository: Repository<Subcategory>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async create(createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
    const { name, categoryId } = createSubcategoryDto;
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

    if (!category) {
      throw new Error('Category not found');
    }

    // Check if the ProductType with the same name and categoryId already exists
    const existingProductType = await this.subCategoryRepository.findOne({
      where: { name, category: { id: categoryId } },
    });

    if (existingProductType) {
      throw new Error('Product Type with this name already exists in this category');
    }

    const newProductType = this.subCategoryRepository.create({ name, category });
    console.log('Saving new ProductType:', newProductType); // Log the entity to confirm
    return await this.subCategoryRepository.save(newProductType);
  }

  async findAll(): Promise<Subcategory[]> {
    return this.subCategoryRepository.find(); // Returns all product types
  }

  async findOne(id: string): Promise<Subcategory> {
    return this.subCategoryRepository.findOne({ where: { id } }); // Returns a product type by id
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategory> {
    await this.subCategoryRepository.update(id, updateSubcategoryDto);
    return this.subCategoryRepository.findOne({ where: { id } }); // Updates the product type
  }

  async remove(id: string): Promise<void> {
    await this.subCategoryRepository.delete(id); // Removes a product type by id
  }
}
