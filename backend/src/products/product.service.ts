import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./schemas/product.schema";

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async createProduct(createProductDto: { name: string; price: number; category: string; photo: string; deliveryTime: number }) {
    const { name, price, category, photo, deliveryTime } = createProductDto;

    const newProduct = new this.productModel({
      name,
      price,
      category,
      photo,
      deliveryTime,
    });

    return await newProduct.save();
  }

  async getProductsByCategory(categoryId: string) {
    return await this.productModel.find({ category: categoryId }).exec();
  }

  async getAllProducts() {
    return await this.productModel.find().exec();
  }
}
