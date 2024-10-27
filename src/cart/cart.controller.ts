import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards, NotFoundException, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { Product } from '../product/entities/product.entity';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserCart(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.cartService.getUserCart(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add/:productId')
  async addItemToCart(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    const userId = req.user.id;

    const product: Product | undefined = await this.productService.findOne(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return this.cartService.addItemToCart(userId, product, quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:productId')
  async removeItemFromCart(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string
  ) {
    const userId = req.user.id;
    return this.cartService.removeItemFromCart(userId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-quantity/:productId')
  async updateItemQuantity(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    const userId = req.user.id;
  
    // Check if the product exists in the user's cart
    const cartItem = await this.cartService.findCartItem(userId, productId);
    if (!cartItem) {
      throw new NotFoundException(`Product with ID ${productId} not found in cart`);
    }
  
    return this.cartService.updateItemQuantity(userId, productId, quantity);
  }  
}
