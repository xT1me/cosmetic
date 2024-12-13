"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrderSchema = exports.Order = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var ProductInfo = /** @class */ (function () {
    function ProductInfo() {
    }
    __decorate([
        mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, ref: 'Product', required: true })
    ], ProductInfo.prototype, "productId");
    __decorate([
        mongoose_1.Prop({ type: Number, required: true })
    ], ProductInfo.prototype, "count");
    ProductInfo = __decorate([
        mongoose_1.Schema()
    ], ProductInfo);
    return ProductInfo;
}());
var ProductInfoSchema = mongoose_1.SchemaFactory.createForClass(ProductInfo);
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        mongoose_1.Prop({ required: true, type: mongoose_2.Types.ObjectId, ref: 'User' })
    ], Order.prototype, "user");
    __decorate([
        mongoose_1.Prop({ type: [ProductInfoSchema], required: true })
    ], Order.prototype, "products");
    __decorate([
        mongoose_1.Prop({ required: true })
    ], Order.prototype, "totalPrice");
    Order = __decorate([
        mongoose_1.Schema()
    ], Order);
    return Order;
}(mongoose_2.Document));
exports.Order = Order;
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
