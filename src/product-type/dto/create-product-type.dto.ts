import { Product } from "src/product/entities/product.entity";
export class CreateProductTypeDto {
    id: string;
    name: string;
    products: Product[];
}
