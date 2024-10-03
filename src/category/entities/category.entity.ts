import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subcategory } from '../../subcategory/entities/subcategory.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Subcategory, (Subcategory) => Subcategory.category)
  subcategories: Subcategory[];
}
