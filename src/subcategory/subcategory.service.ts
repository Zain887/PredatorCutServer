import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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

  // Create a new subcategory
  async create(createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
    const { name, categoryId } = createSubcategoryDto;

    // Find the associated category
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Check if a subcategory with the same name exists under the same category
    const existingSubcategory = await this.subCategoryRepository.findOne({
      where: { name, category: { id: categoryId } }, // Correct reference to category in the query
    });

    if (existingSubcategory) {
      throw new ConflictException('Subcategory with this name already exists in this category');
    }

    // Create the new subcategory
    const newSubcategory = this.subCategoryRepository.create({ name, category });
    return await this.subCategoryRepository.save(newSubcategory);
  }

  // Method to find subcategories by categoryId
  async findByCategoryId(categoryId: string): Promise<Subcategory[]> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    return this.subCategoryRepository.find({ where: { category: { id: categoryId } } });
  }
  
  // Retrieve all subcategories
  async findAll(): Promise<Subcategory[]> {
    return this.subCategoryRepository.find({ relations: ['category'] }); // Include category relation if needed
  }

  // Retrieve a single subcategory by id
  async findOne(id: string): Promise<Subcategory> {
    const subcategory = await this.subCategoryRepository.findOne({ where: { id } });
    if (!subcategory) {
      throw new NotFoundException(`Subcategory with id ${id} not found`);
    }
    return subcategory;
  }

  // Update a subcategory
  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategory> {
    const existingSubcategory = await this.subCategoryRepository.findOne({ where: { id } });
    
    if (!existingSubcategory) {
      throw new NotFoundException(`Subcategory with id ${id} not found`);
    }
  
    // If categoryId is provided, ensure it exists
    if (updateSubcategoryDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: updateSubcategoryDto.categoryId } });
      
      if (!category) {
        throw new NotFoundException(`Category with id ${updateSubcategoryDto.categoryId} not found`);
      }
  
      existingSubcategory.category = category; // Update the category
    }
  
    // Update the subcategory fields
    Object.assign(existingSubcategory, updateSubcategoryDto);
    
    await this.subCategoryRepository.save(existingSubcategory); // Save the updated subcategory
    return existingSubcategory;
  }
  

  // Remove a subcategory
  async remove(id: string): Promise<void> {
    const subcategory = await this.subCategoryRepository.findOne({ where: { id } });
    if (!subcategory) {
      throw new NotFoundException(`Subcategory with id ${id} not found`);
    }

    await this.subCategoryRepository.delete(id);
  }
}
