import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.findAllCategoriesWithDetails();
  }

  @Get(':categoryId/subcategories')
  async getSubcategories(@Param('categoryId') categoryId: string) {
    return this.categoryService.getSubcategoriesByCategory(categoryId);
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
