import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard/jwt-auth.guard';
import { LoginDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Signup API
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  // Login API
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user; // Return the authenticated user
  }
}
