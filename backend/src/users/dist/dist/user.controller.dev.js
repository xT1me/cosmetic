"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
exports.UsersController = void 0;

var common_1 = require("@nestjs/common");

var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");

var UsersController =
/** @class */
function () {
  function UsersController(usersService, authService) {
    this.usersService = usersService;
    this.authService = authService;
  }

  UsersController.prototype.create = function (body) {
    return __awaiter(this, void 0, void 0, function () {
      var user, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);

            return [4
            /*yield*/
            , this.usersService.create(body.username, body.password)];

          case 1:
            user = _a.sent();
            return [2
            /*return*/
            , {
              message: 'User created successfully',
              user: user
            }];

          case 2:
            error_1 = _a.sent();

            if (error_1.status === 400) {
              throw new common_1.HttpException('Username already exists', common_1.HttpStatus.CONFLICT);
            }

            throw new common_1.HttpException('Failed to create user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  UsersController.prototype.checkAuth = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , {
          message: 'User is authenticated'
        }];
      });
    });
  };

  UsersController.prototype.findByEmail = function (username) {
    return __awaiter(this, void 0, void 0, function () {
      var user;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.usersService.findByEmail(username)];

          case 1:
            user = _a.sent();

            if (!user) {
              throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }

            return [2
            /*return*/
            , user];
        }
      });
    });
  };

  UsersController.prototype.login = function (body) {
    return __awaiter(this, void 0, void 0, function () {
      var username, password, user, isPasswordValid, token;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            username = body.username, password = body.password;
            return [4
            /*yield*/
            , this.usersService.findByEmail(username)];

          case 1:
            user = _a.sent();

            if (!user) {
              throw new common_1.HttpException('Invalid username or password', common_1.HttpStatus.UNAUTHORIZED);
            }

            isPasswordValid = user.password === password;

            if (!isPasswordValid) {
              throw new common_1.HttpException('Invalid username or password', common_1.HttpStatus.UNAUTHORIZED);
            }

            return [4
            /*yield*/
            , this.authService.login(user)];

          case 2:
            token = _a.sent();
            return [2
            /*return*/
            , {
              message: 'Login successful',
              token: token
            }];
        }
      });
    });
  };

  __decorate([common_1.Post(), __param(0, common_1.Body())], UsersController.prototype, "create");

  __decorate([common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard), common_1.Post('check')], UsersController.prototype, "checkAuth");

  __decorate([common_1.Get(':username'), __param(0, common_1.Param('username'))], UsersController.prototype, "findByEmail");

  __decorate([common_1.Post('login'), __param(0, common_1.Body())], UsersController.prototype, "login");

  UsersController = __decorate([common_1.Controller('users')], UsersController);
  return UsersController;
}();

exports.UsersController = UsersController;