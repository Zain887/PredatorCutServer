import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductComment } from '../../product-comment/entities/product-comment.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  shortDescription: string;

  @Column('float')
  price: number;

  @Column('simple-array')
  imageUrl: string[];

  @Column('jsonb', { nullable: true })
  productDetails: {
    description?: string;
    bladeLength?: string;
    bladeMaterial?: string;
    handleLength?: string;
    handleMaterial?: string;
    totalLength?: string;
  };

  @Column()
  quantity: number;

  @Column('simple-array', { nullable: true })
  tag: string[];

  @OneToMany(() => ProductComment, (comment) => comment.id, { cascade: true })
  comments: ProductComment[];
}
