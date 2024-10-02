import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartItem, (item) => item.product, { cascade: true })
  items: CartItem[];

  @Column({ type: 'int' })
  totalQuantity: number;

  @Column({ type: 'decimal' })
  totalPrice: number;
}
