// src/user/user.controller.ts
import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth.service';
import { LoginDto } from 'src/login.dto';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/types/authenticated-request';
// import { AuthenticatedRequest } from '../types/authenticated-request'; // Import your custom type

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto); // Call AuthService's register method
  }

  @Post('login') // Login endpoint
  async login(@Body() loginUserDto: LoginDto) {
    return this.authService.login(loginUserDto); // Call AuthService's login method
  }

  @Get('status')
  getStatus(@Req() req: AuthenticatedRequest, @Res() res: Response) {  // Use AuthenticatedRequest here
    console.log('Status endpoint hit');
    const isLoggedIn = !!req.user; // TypeScript should now recognize req.user
    res.json({ isLoggedIn });
  }
}
