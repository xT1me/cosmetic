import { Controller, Post, Body, Req, UseGuards, Res, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('check')
  async checkAuth(@Req() req) {
    const user = req.user; 

    return {
      status: true,
      userId: user?.userId,
    };
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res) {
    const user = req.user._doc || req.user;
  
    const tokens = await this.authService.login(user);
  
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 3600000,
    });
  
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 604800000,
    });
  
    const userId = user._id;
  
    return res.send({
      message: 'Login successful',
      userId,
    });
  }
  
  @UseGuards(JwtAuthGuard)
  @Post("refresh")
  async refresh(@Body("refreshToken") refreshToken: string) {
    const user = await this.authService.validateRefreshToken(refreshToken);
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerData: { email: string; username: string; password: string }) {
    const newUser = await this.authService.register(registerData);
    return this.authService.login(newUser);
  }

  @Post('logout')
  async logout(@Res() res) {
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'Lax' });
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Lax' });

    return res.send({ message: 'Logout successful' });
  }
}
