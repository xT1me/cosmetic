"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProduct = exports.getProductsByCategory = exports.getProducts = void 0;

var _api = _interopRequireDefault(require("../api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getProducts = function getProducts() {
  var response;
  return regeneratorRuntime.async(function getProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get('/products'));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching products:', _context.t0);
          throw _context.t0;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getProducts = getProducts;

var getProductsByCategory = function getProductsByCategory(categoryId) {
  var response;
  return regeneratorRuntime.async(function getProductsByCategory$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/products/category/".concat(categoryId)));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching products by category:', _context2.t0);
          throw _context2.t0;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getProductsByCategory = getProductsByCategory;

var createProduct = function createProduct(productData) {
  var formData, response;
  return regeneratorRuntime.async(function createProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          formData = new FormData();
          formData.append('name', productData.name);
          formData.append('description', productData.description);
          formData.append('price', productData.price);
          formData.append('quantity', productData.quantity);
          formData.append('category', productData.category);
          formData.append('image', productData.image);
          _context3.prev = 7;
          _context3.next = 10;
          return regeneratorRuntime.awrap(_api["default"].post('/products', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }));

        case 10:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](7);
          console.error('Error creating product:', _context3.t0);
          throw _context3.t0;

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[7, 14]]);
};

exports.createProduct = createProduct;