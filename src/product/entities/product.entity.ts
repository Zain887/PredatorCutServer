import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ProductComment } from '../../product-comment/entities/product-comment.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column('text', { array: true })
  imageUrl: string[];

  @Column('text', { nullable: true })
  shortDescription?: string;

  @ManyToOne(() => Subcategory, { nullable: true })
  @JoinColumn({ name: 'subcategoryId' })
  subcategory: Subcategory; // This links the subcategoryId as a foreign key

  @Column({ nullable: true })
  subcategoryId: string; // This is required for storing the actual subcategoryId

  @OneToMany(() => ProductComment, (comment) => comment.product, {
    cascade: true,
  })
  comments?: ProductComment[];

  @Column('jsonb', { nullable: true })
  productDetails?: {
    description?: string;
    bladeLength?: string;
    bladeMaterial?: string;
    handleLength?: string;
    handleMaterial?: string;
    totalLength?: string;
  };

  @Column({ type: 'int' })
  quantity: number;

  @Column('text', { array: true, nullable: true })
  tag?: string[];
}
