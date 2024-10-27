// src/user/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true }) // Ensure to add the username field
  username?: string;

  @Column()
  password: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @Column({ default: true })
  isActive: boolean;
}
