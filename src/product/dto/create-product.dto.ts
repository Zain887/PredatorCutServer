import { ProductComment } from "src/product-comment/entities/product-comment.entity";
export class CreateProductDto {
    id: string;
    name: string;
    shortDescription?: string;
    price: number;
    imageUrl: string[];
    productDetails?: {
        description?: string,
        bladeLength?: string,
        bladeMaterial?: string,
        handleLength?: string,
        handleMaterial?: string,
        totalLength?: string,

    }
    quantity: number;
    tag?: string[];
    comments?: ProductComment[];
    subcategoryId: string;
    categoryId: string;
}
