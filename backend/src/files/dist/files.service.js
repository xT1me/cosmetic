"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilesService = void 0;
var common_1 = require("@nestjs/common");
var fs_1 = require("fs");
var path_1 = require("path");
var FilesService = /** @class */ (function () {
    function FilesService() {
    }
    FilesService.prototype.saveFileMetadata = function (file) {
        return {
            message: 'File uploaded successfully',
            originalName: file.originalname,
            filePath: file.path,
            size: file.size
        };
    };
    FilesService.prototype.validateFileExistence = function (filePath) {
        var fullPath = path_1.join(process.cwd(), 'uploads', filePath);
        if (!fs_1.existsSync(fullPath)) {
            throw new common_1.NotFoundException('File not found');
        }
        return fullPath;
    };
    FilesService = __decorate([
        common_1.Injectable()
    ], FilesService);
    return FilesService;
}());
exports.FilesService = FilesService;
