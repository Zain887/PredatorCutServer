import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.id)
  productId: Product;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column()
  quantity: number;

  @Column()
  imageUrl: string;

  @Column('float')
  total: number;
}
