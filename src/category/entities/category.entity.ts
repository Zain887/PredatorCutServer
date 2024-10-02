import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductType } from '../../product-type/entities/product-type.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ProductType, (productType) => productType.category)
  subcategories: ProductType[];
}
