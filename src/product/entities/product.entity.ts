import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ProductType } from '../../product-type/entities/product-type.entity';
import { ProductComment } from '../../product-comment/entities/product-comment.entity';

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

  @ManyToOne(() => ProductType, (productType) => productType.products)
  @JoinColumn({ name: 'productTypeId' }) // This specifies the foreign key column
  productType: ProductType;

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
