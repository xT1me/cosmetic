import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  photo: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId;

  @Prop({ required: true })
  deliveryTime: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
