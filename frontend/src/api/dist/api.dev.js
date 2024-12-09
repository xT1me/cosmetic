"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.API_URL = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API_URL = 'http://localhost:3002';
exports.API_URL = API_URL;

var getToken = function getToken() {
  return localStorage.getItem('token');
};

var api = _axios["default"].create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(function (config) {
  var token = getToken();

  if (token) {
    config.headers.Authorization = "Bearer ".concat(token);
  }

  return config;
});
var _default = api;
exports["default"] = _default;