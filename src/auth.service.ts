import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { LoginDto } from './login.dto';
import { adminCredentials } from './data'; // Adjust the import path as needed

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    return this.userService.create(createUserDto);
  }

  async login(loginUserDto: LoginDto) {
    const { email, password } = loginUserDto;

    // Check if the login attempt is for the admin
    if (email === adminCredentials.email && password === adminCredentials.password) {
      const payload = { email: adminCredentials.email, sub: 'admin' }; // Sub can be 'admin'
      return { access_token: this.jwtService.sign(payload), isAdmin: true }; // Indicate admin login
    }

    // Check for a regular user
    const user = await this.userService.findOneByEmail(email);
    if (!user || !(await this.userService.comparePasswords(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload), isAdmin: false }; // Indicate regular user login
  }
}
