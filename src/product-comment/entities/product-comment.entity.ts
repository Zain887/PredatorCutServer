import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class ProductComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user: string;

  @Column('text')
  comment: string;

  @Column({ type: 'int', nullable: true })
  rating?: number;

  @ManyToOne(() => Product, (product) => product.comments)
  @JoinColumn({ name: 'productId' }) // This specifies the foreign key column
  product: Product;
}
