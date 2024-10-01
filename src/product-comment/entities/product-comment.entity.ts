import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user: string;

  @Column()
  comment: string;

  @Column({ nullable: true })
  rating: number;
}
