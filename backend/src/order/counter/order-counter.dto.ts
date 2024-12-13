import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class OrderCounter extends Document {
  @Prop({ required: true })
  counter: number;
}

export const OrderCounterSchema = SchemaFactory.createForClass(OrderCounter);
