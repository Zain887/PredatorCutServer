import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  total: number;

  @Column({ nullable: true })
  imageUrl: string;  // Ensure this property is defined correctly
}
