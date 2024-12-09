"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var config_1 = require("@nestjs/config");
var files_module_1 = require("./files/files.module");
var category_module_1 = require("./categories/category.module");
var product_module_1 = require("./products/product.module");
var order_module_1 = require("./order/order.module");
var auth_module_1 = require("./auth/auth.module");
var user_module_1 = require("./users/user.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
                user_module_1.UsersModule,
                auth_module_1.AuthModule,
                files_module_1.FilesModule,
                category_module_1.CategoriesModule,
                product_module_1.ProductsModule,
                order_module_1.OrdersModule,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
