import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn({ name: 'categoryId' }) // This specifies the foreign key column
  category: Category;

  @OneToMany(() => Product, (product) => product.productType)
  products: Product[];
}
