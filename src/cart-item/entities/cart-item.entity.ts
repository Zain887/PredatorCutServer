import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' }) // This specifies the foreign key column
  product: Product;

  @Column({ type: 'decimal' })
  total: number;
}
