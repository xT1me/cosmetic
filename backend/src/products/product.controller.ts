import { Controller, Get, Post, UseInterceptors, UploadedFile, Body, Param, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto'; 
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorators/role.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ROLE_ADMIN')
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
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { name, price, category, deliveryTime } = createProductDto;

    const imageUrl = file ? `/uploads/products/${file.filename}` : null;

    const newProduct = await this.productsService.createProduct({
      name,
      price,
      category,
      photo: imageUrl,
      deliveryTime,
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
