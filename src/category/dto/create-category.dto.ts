import { ProductTypes } from "src/product-type/entities/product-type.entity";
export class CreateCategoryDto {
    id: string;
    name: string;
    subcategories: ProductTypes[];
}
