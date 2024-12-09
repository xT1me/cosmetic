"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrder = void 0;

var _api = _interopRequireDefault(require("../api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createOrder = function createOrder(username, cartItems, total) {
  var payload, response;
  return regeneratorRuntime.async(function createOrder$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = {
            userId: username,
            products: cartItems,
            totalPrice: total
          };
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_api["default"].post('/orders', payload, {
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 4:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.error('Error creating product:', _context.t0);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.createOrder = createOrder;