import { Controller, Get, Post, UseInterceptors, UploadedFile, Body, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorators/role.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ROLE_ADMIN')
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/categories',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { name } = createCategoryDto;
    const imageUrl = file ? `/uploads/categories/${file.filename}` : null;

    const newCategory = await this.categoriesService.createCategory({ name, photo: imageUrl });
    return newCategory;
  }

  @Get()
  async getAllCategories() {
    return await this.categoriesService.getAllCategories();
  }
}
