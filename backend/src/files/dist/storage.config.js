"use strict";
exports.__esModule = true;
exports.storage = void 0;
var multer_1 = require("multer");
var path_1 = require("path");
exports.storage = multer_1.diskStorage({
    destination: './uploads',
    filename: function (req, file, callback) {
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        var ext = path_1.extname(file.originalname);
        callback(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});
