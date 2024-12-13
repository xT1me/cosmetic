import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 
export class User extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, unique: true, trim: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ type: [String], default: [] }) 
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
