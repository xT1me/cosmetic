import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './order.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: { userId: string; products: any; totalPrice: number },
  ) {
    console.log(createOrderDto.products)
    return this.ordersService.createOrder(createOrderDto);
  }
}
