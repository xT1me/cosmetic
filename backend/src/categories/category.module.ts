import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoriesService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './category.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
