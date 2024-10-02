// dto/create-category.dto.ts
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { ProductType } from '../../product-type/entities/product-type.entity'; // Make sure you have a type defined for subcategories

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  subcategories: ProductType[];
}
