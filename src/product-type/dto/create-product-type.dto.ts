import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  categoryId: string;

}
