import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.id, { cascade: true })
  items: CartItem[];

  @Column()
  totalQuantity: number;

  @Column('float')
  totalPrice: number;
}
