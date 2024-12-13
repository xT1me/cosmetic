import { 
  Controller, 
  Get, 
  Param, 
  Patch, 
  Body, 
  UseGuards, 
  Request
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './user.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Request() req) {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/verify-email')
  async verifyEmail(@Param('id') id: string) {
    await this.usersService.verifyEmail(id);
    return { message: 'Email verified successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/add-role')
  async addRole(
    @Param('id') id: string, 
    @Body('role') role: string
  ) {
    await this.usersService.addRole(id, role);
    return { message: `Role ${role} added successfully` };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/remove-role')
  async removeRole(
    @Param('id') id: string, 
    @Body('role') role: string
  ) {
    await this.usersService.removeRole(id, role);
    return { message: `Role ${role} removed successfully` };
  }
}
