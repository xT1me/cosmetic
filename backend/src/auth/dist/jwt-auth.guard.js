"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JwtAuthGuard = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var JwtAuthGuard = /** @class */ (function () {
    function JwtAuthGuard(jwtService) {
        this.jwtService = jwtService;
    }
    JwtAuthGuard.prototype.canActivate = function (context) {
        var _a;
        var request = context.switchToHttp().getRequest();
        var token = (_a = request.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new common_2.UnauthorizedException('No token provided');
        }
        try {
            var decoded = this.jwtService.verify(token);
            request.user = decoded;
            return true;
        }
        catch (error) {
            throw new common_2.UnauthorizedException('Invalid or expired token');
        }
    };
    JwtAuthGuard = __decorate([
        common_1.Injectable()
    ], JwtAuthGuard);
    return JwtAuthGuard;
}());
exports.JwtAuthGuard = JwtAuthGuard;
