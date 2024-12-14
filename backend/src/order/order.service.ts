import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from './schemas/order.dto';
import { Product } from 'src/products/schemas/product.schema';
import { OrderCounter } from './counter/order-counter.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(OrderCounter.name) private readonly orderCounterModel: Model<OrderCounter>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async createOrder(createOrderDto: { userId: string; products: { productId: string; count: number }[]; totalPrice: number }) {
    const userId = new Types.ObjectId(createOrderDto.userId);

    const products = createOrderDto.products.map((product) => ({
      productId: new Types.ObjectId(product.productId),
      count: product.count,
    }));

    const orderCounter = await this.orderCounterModel.findOneAndUpdate(
      {},
      { $inc: { counter: 1 } },
      { new: true, upsert: true }
    );

    const orderNumber = orderCounter.counter;

    const order = await this.orderModel.create({
      user: userId,
      products,
      totalPrice: createOrderDto.totalPrice,
      orderNumber: orderNumber,
    });

    const populatedOrder = await this.orderModel
      .findById(order._id)
      .populate('user')
      .populate({
        path: 'products.productId',
        model: 'Product',
      })
      .exec();

    return populatedOrder;
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
  }  

  async getAllOrders() {
    return this.orderModel
      .find()
      .populate('user')
      .populate({
        path: 'products.productId',
        model: 'Product',
      })
      .exec();
  }

  async getOrdersByUser(userId: string) {
    const userObjectId = new Types.ObjectId(userId);
    return this.orderModel
      .find({ user: userObjectId })
      .populate('user')
      .populate({
        path: 'products.productId',
        model: 'Product',
      })
      .exec();
  }

  async getOrdersByUserCompleted(userId: string) {
    const userObjectId = new Types.ObjectId(userId);
    return this.orderModel
      .find({ user: userObjectId, status: 'completed' })
      .populate('user')
      .populate({
        path: 'products.productId',
        model: 'Product',
      })
      .exec();
  }

  async getOrdersByUserInTransit(userId: string) {
    const userObjectId = new Types.ObjectId(userId);
    return this.orderModel
      .find({ user: userObjectId, status: 'in transit' })
      .populate('user')
      .populate({
        path: 'products.productId',
        model: 'Product',
      })
      .exec();
  }
}
