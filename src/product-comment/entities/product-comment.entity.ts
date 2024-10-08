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

  // Relationship to the Product entity
  @ManyToOne(() => Product, (product) => product.comments)
  @JoinColumn({ name: 'productId' }) // Links the foreign key column for productId
  product: Product; // You reference the whole Product object, not just the productId
}
