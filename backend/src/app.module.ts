import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { CategoriesModule } from './categories/category.module';
import { ProductsModule } from './products/product.module';
import { OrdersModule } from './order/order.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { DefaultDataService } from './default-data/default-data.service';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    FilesModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
  ],
  providers: [DefaultDataService]
})
export class AppModule {}
