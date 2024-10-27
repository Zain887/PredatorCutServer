import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from '../cart-item/entities/cart-item.entity';
import { Product } from '../product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({ 
      where: { user: { id: userId } }, 
      relations: ['items', 'items.product'] 
    });

    if (!cart) {
      cart = this.cartRepository.create({ 
        user: { id: userId }, 
        items: [], 
        totalQuantity: 0, 
        totalPrice: 0 
      });
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addItemToCart(userId: string, product: Product, quantity: number): Promise<Cart> {
    const cart = await this.getUserCart(userId);
    let cartItem = cart.items.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.total = cartItem.quantity * cartItem.price;
    } else {
      cartItem = this.cartItemRepository.create({
        product: product,
        price: product.price,
        quantity,
        total: product.price * quantity,
        cart: cart,
        imageUrl: product.imageUrl || '', // Ensure this is a string
      } as DeepPartial<CartItem>);

      cart.items.push(cartItem);
    }

    // Update totals
    cart.totalQuantity += quantity;
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.total, 0);

    await this.cartRepository.save(cart);
    return cart;
}


  async removeItemFromCart(userId: string, productId: string): Promise<CartItem[]> {
    const cart = await this.getUserCart(userId);
    const cartItemIndex = cart.items.findIndex(item => item.product.id === productId);

    if (cartItemIndex === -1) {
      throw new NotFoundException('Cart item not found');
    }

    // Remove the item from the cart and recalculate totals
    const [removedItem] = cart.items.splice(cartItemIndex, 1);
    await this.cartItemRepository.remove(removedItem);

    cart.totalQuantity -= removedItem.quantity;
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.total, 0);

    await this.cartRepository.save(cart);
    return cart.items;
  }

  async updateItemQuantity(userId: string, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.getUserCart(userId);
    const cartItem = cart.items.find(item => item.product.id === productId);

    if (!cartItem) throw new NotFoundException('Item not found in cart');

    cartItem.quantity = quantity;
    cartItem.total = cartItem.price * quantity;

    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.total, 0);

    await this.cartRepository.save(cart);
    return cart;
  }

  async findCartItem(userId: string, productId: string): Promise<CartItem | undefined> {
    return this.cartItemRepository.findOne({
      where: { cart: { user: { id: userId } }, product: { id: productId } },
      relations: ['product', 'cart', 'cart.user'],
    });
  }
}
