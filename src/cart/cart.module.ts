import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { User } from 'src/user/entities/user.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[TypeOrmModule.forFeature([Cart, CartItem, User]),ProductModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
