import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  categoryId: string;

}
