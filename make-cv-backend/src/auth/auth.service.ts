import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { LoginDto, SignupDto } from './dto/auth.dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 🔹 User Signup
  async signup(signupDto: SignupDto): Promise<{ message: string }> {
    const { email, password } = signupDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) throw new UnauthorizedException('User already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = this.userRepository.create({ email, password: hashedPassword });
    await this.userRepository.save(user);

    return { message: 'User registered successfully' };
  }

  // 🔹 User Login
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT token
    const payload = { userId: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
