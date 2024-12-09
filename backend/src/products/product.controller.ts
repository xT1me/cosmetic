import { Controller, Get, Post, UseInterceptors, UploadedFile, Body, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createProduct(
    @Body() createProductDto: { name: string; description: string; price: number; category: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { name, price, category } = createProductDto;

    const imageUrl = file ? `/uploads/products/${file.filename}` : null;

    const newProduct = await this.productsService.createProduct({
      name,
      price,
      category,
      photo: imageUrl,
    });

    return newProduct;
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get('category/:categoryId')
  async getProductsByCategory(@Param('categoryId') categoryId: string) {
    return await this.productsService.getProductsByCategory(categoryId);
  }
}
