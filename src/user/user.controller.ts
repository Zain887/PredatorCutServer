// src/user/user.controller.ts
import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
// import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth.service';
import { LoginDto } from 'src/login.dto';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/types/express-request.interface';

@Controller('user')
export class UserController {
  constructor(
    // private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto); // Call AuthService's register method
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginDto) {
    const { access_token, isAdmin } = await this.authService.login(loginUserDto);
    return { access_token, isAdmin }; // Return both token and admin status
  }
  

  @Get('status')
  getStatus(@Req() req: AuthenticatedRequest, @Res() res: Response) {  // Use AuthenticatedRequest here
    console.log('Status endpoint hit');
    const isLoggedIn = !!req.user; // TypeScript should now recognize req.user
    res.json({ isLoggedIn });
  }
}
