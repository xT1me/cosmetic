import { Controller, Post, Body, Get, Param, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorators/role.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ROLE_ADMIN')
  @Get()
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getOrdersByUser(@Param('userId') userId: string) {
    return this.ordersService.getOrdersByUser(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ROLE_ADMIN')
  @Post(':orderId/status')
  async updateOrderStatus(@Param('orderId') orderId: string, @Body('status') status: string) {
    return this.ordersService.updateOrderStatus(orderId, status);
  }


  @UseGuards(JwtAuthGuard)
  @Get('user/:userId/completed')
  async getOrdersByUserCompleted(@Param('userId') userId: string) {
    return this.ordersService.getOrdersByUserCompleted(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId/in-transit')
  async getOrdersByUserInTransit(@Param('userId') userId: string) {
    return this.ordersService.getOrdersByUserInTransit(userId);
  }
}
