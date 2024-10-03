import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async findAllCategoriesWithDetails(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      relations: ['subcategories', 'subcategories.products', 'subcategories.products.comments'],
    });

    console.log('Categories fetched:', categories); // Log the data being returned
    return categories;
  }

  // Method to fetch subcategories by category ID
  async getSubcategoriesByCategory(categoryId: string) {
    // This is assuming you're fetching from a database
    const category = await this.categoryRepository.findOne({ where: { id: categoryId }, relations: ['subcategories'] });

    if (!category) {
      throw new Error('Category not found');
    }

    return category.subcategories; // Return the related subcategories
  }

  // Updated create method
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto); // Create the category entity

    // Save the category to the database
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto); // Update the category
    return this.categoryRepository.findOne({ where: { id } }); // Return the updated category
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id); // Remove the category
  }
}
