import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema() // Explicitly define ProductInfo as a schema
class ProductInfo {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  count: number;
}

const ProductInfoSchema = SchemaFactory.createForClass(ProductInfo);

@Schema()
export class Order extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: [ProductInfoSchema], required: true })
  products: ProductInfo[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  deliveryDate: Date;

  @Prop({
    type: String,
    enum: ['in transit', 'delivered'],
    default: 'in transit',
  })
  status: string;

  @Prop({ required: true, unique: true })
  orderNumber: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    this.orderNumber = Date.now();
  }
  next();
});