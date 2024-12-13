import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { Order, OrderSchema } from './schemas/order.dto';

import { ProductsModule } from 'src/products/product.module';
import { OrderCounter, OrderCounterSchema } from './counter/order-counter.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderCounter.name, schema: OrderCounterSchema },
    ]),
    ProductsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
