import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class ProductTypes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Product, (product) => product.id, { cascade: true })
    products: Product[];

    @ManyToOne(() => Category, (category) => category.subcategories)
    category: Category;
}
