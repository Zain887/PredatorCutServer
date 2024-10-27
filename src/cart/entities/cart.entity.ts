import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items: CartItem[];

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' }) // No forwardRef here
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int', default: 0 })
  totalQuantity: number;

  @Column({ type: 'decimal', default: 0 })
  totalPrice: number;
}
