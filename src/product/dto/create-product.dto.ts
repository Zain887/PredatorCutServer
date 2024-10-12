import { IsString, IsOptional, IsNumber, IsArray, IsObject, IsNotEmpty } from 'class-validator';
import { ProductComment } from 'src/product-comment/entities/product-comment.entity';

export class CreateProductDto {
    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    shortDescription?: string;

    @IsNumber()
    price: number;

    @IsArray()
    @IsString({ each: true })
    imageUrl: string[];

    @IsObject()
    @IsOptional()
    productDetails?: {
        description?: string;
        bladeLength?: string;
        bladeMaterial?: string;
        handleLength?: string;
        handleMaterial?: string;
        totalLength?: string;
    };

    @IsNumber()
    quantity: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tag?: string[];

    @IsArray()
    @IsOptional()
    comments?: ProductComment[];

    @IsString()
    @IsNotEmpty()
    subcategoryId: string;

    @IsString()
    @IsNotEmpty()
    categoryId: string;
}
