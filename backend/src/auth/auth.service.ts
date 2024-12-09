import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
  
    return this.usersService.createUser(username, email, password);
  }
  
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
  
    const payload = { username: user.username, sub: user._id };
    const token = this.jwtService.sign(payload);
  
    return { token, username: user.username, id: user._id };
  }
  

  async validateUser(username: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) {
      return null;
    }
    return { username: user.username, userId: user._id };
  }
}
