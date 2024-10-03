// dto/create-category.dto.ts
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  subcategories: Subcategory[];
}
