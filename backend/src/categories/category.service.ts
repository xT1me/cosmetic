import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

  async createCategory(createCategoryDto: { name: string; photo: string }) {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async getAllCategories() {
    return await this.categoryModel.find().exec();
  }
}
