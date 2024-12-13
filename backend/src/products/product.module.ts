import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';

import { ProductController } from './product.controller';
import { ProductsService } from './product.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductsService],
  exports: [MongooseModule]
})
export class ProductsModule {}
