import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('app')
export class AppController {
  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtectedRoute() {
    return { message: 'This is a protected route!' };
  }
}
