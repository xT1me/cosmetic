import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

  async createOrder(createOrderDto: { userId: string; products: { productId: string; count: number }[]; totalPrice: number }) {
    const userId = new Types.ObjectId(createOrderDto.userId);
  
    // Преобразуем `productId` в ObjectId и включаем `count`
    const products = createOrderDto.products.map((product) => ({
      productId: new Types.ObjectId(product.productId),
      count: product.count,
    }));
  
    const order = await this.orderModel.create({
      user: userId,
      products,
      totalPrice: createOrderDto.totalPrice,
    });
  
    const populatedOrder = await this.orderModel
    .findById(order._id)
    .populate('user') // Populate user
    .populate('products.productId') // Populate nested productId
    .exec();
  
  
    return populatedOrder;
  }
  
  
}
