"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategoryImage = exports.getCategories = exports.createCategory = void 0;

var _api = _interopRequireDefault(require("../api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createCategory = function createCategory(name, image) {
  var formData, response;
  return regeneratorRuntime.async(function createCategory$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          formData = new FormData();
          formData.append('name', name);
          formData.append('image', image);
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(_api["default"].post('/categories', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }));

        case 6:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          console.error('Error creating category:', _context.t0);
          throw _context.t0;

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

exports.createCategory = createCategory;

var getCategories = function getCategories() {
  var response;
  return regeneratorRuntime.async(function getCategories$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get('/categories'));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching categories:', _context2.t0);
          throw _context2.t0;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getCategories = getCategories;

var getCategoryImage = function getCategoryImage(path) {
  var response;
  return regeneratorRuntime.async(function getCategoryImage$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_api["default"].get("/files/".concat(path), {
            responseType: 'blob'
          }));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", URL.createObjectURL(response.data));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error('Error fetching file:', _context3.t0);
          throw _context3.t0;

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getCategoryImage = getCategoryImage;