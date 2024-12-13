import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}


  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const existingUser = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new this.userModel({
      username,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      roles: ['ROLE_USER'],
    });
    const savedUser = await user.save();
  
    const userWithoutPassword = savedUser.toObject() as Omit<User, 'password'>;
    return userWithoutPassword;
  }
  

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userModel.find().select('-password').exec();
    return users.map((user) => user.toObject());
  }

  async findOneById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.toObject();
  }


  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }


  async exists(username: string, email: string): Promise<boolean> {
    const user = await this.userModel.findOne({
      $or: [{ username }, { email }],
    }).exec();
    return !!user;
  }

  async verifyEmail(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isEmailVerified = true;
    await user.save();
  }

  async addRole(userId: string, role: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.roles.includes(role)) {
      user.roles.push(role);
      await user.save();
    }
  }

  async removeRole(userId: string, role: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.roles = user.roles.filter((r) => r !== role);
    await user.save();
  }
}
