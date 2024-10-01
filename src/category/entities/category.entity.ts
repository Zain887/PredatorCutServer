import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductTypes } from '../../product-type/entities/product-type.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ProductTypes, (productType) => productType.id, { cascade: true })
  subcategories: ProductTypes[];
}
