import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/user.service";
import { User } from "src/users/schemas/user.schema";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateAccessToken(payload: any, token: string): Promise<boolean> {
    return true;
  }

  async login(user: any) {
    const payload = { userId: user._id, roles: user.roles };
    
    const accessToken = this.jwtService.sign(payload, {
      secret: 'dL8oS1+WZ/pLvEYeMkmO4Z3HYQWhYZ88n2vqQfr2aFA=',
      expiresIn: '1h',
    });
  
    const refreshToken = this.jwtService.sign(payload, {
      secret: 'dL8oS1+WZ/pLvEYeMkmO4Z3HYQWhYZ88n2vqQfr2aFA=',
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
  


  async validateRefreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findOneById(payload.sub);
      return user;
    } catch (e) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async register(registerData: { email: string; username: string; password: string }) {
    return this.usersService.createUser(
      registerData.username,
      registerData.email,
      registerData.password
    );
  }
}
