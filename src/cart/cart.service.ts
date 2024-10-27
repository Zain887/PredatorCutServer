import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from '../cart-item/entities/cart-item.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) { }

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
      // Item already in cart, increase quantity and update total for this item
      cartItem.quantity += quantity;
      cartItem.total = cartItem.quantity * cartItem.price;
    } else {
      // Item not in cart, create a new cart item
      cartItem = this.cartItemRepository.create({
        product: product,
        price: product.price,
        quantity,
        total: product.price * quantity,
        cart: cart,
        imageUrl: product.imageUrl || '',
      } as DeepPartial<CartItem>);

      cart.items.push(cartItem);
    }

    // Update the cart's total quantity and price
    cart.totalQuantity += quantity;
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.total, 0);

    await this.cartRepository.save(cart);
    return cart;
  }

  async removeItemFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product', 'user'],
    });

    if (!cart) throw new NotFoundException('Cart not found for this user');

    const itemIndex = cart.items.findIndex(item => item.product.id === productId);
    if (itemIndex === -1) throw new NotFoundException('Item not found in cart');

    // Remove the item from the cart
    const item = cart.items[itemIndex];
    cart.items.splice(itemIndex, 1);
    cart.totalQuantity -= item.quantity;
    cart.totalPrice -= item.total;

    await this.cartRepository.save(cart);
    return cart;
  }

  // Method to find a specific cart item by userId and productId
  async findCartItem(userId: string, productId: string): Promise<CartItem | undefined> {
    return this.cartItemRepository.findOne({
      where: {
        cart: { user: { id: userId } },
        product: { id: productId },
      },
      relations: ['product', 'cart', 'cart.user'],
    });
  }

  async updateItemQuantity(userId: string, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.getUserCart(userId);
    const cartItem = cart.items.find(item => item.product.id === productId);

    if (!cartItem) throw new NotFoundException('Item not found in cart');

    cartItem.quantity = quantity;
    cartItem.total = cartItem.price * quantity;

    // Update cart totals
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.total, 0);

    await this.cartRepository.save(cart);
    return cart;
  }
}
