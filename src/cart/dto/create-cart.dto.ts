import { CartItem } from "src/cart-item/entities/cart-item.entity";
export class CreateCartDto {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}
