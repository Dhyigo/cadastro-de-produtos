"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _productRouter = require('./routes/productRouter'); var _productRouter2 = _interopRequireDefault(_productRouter);
var _userRouter = require('./routes/userRouter'); var _userRouter2 = _interopRequireDefault(_userRouter);
var _tokenRouter = require('./routes/tokenRouter'); var _tokenRouter2 = _interopRequireDefault(_tokenRouter);

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
  }

  routes() {
    this.app.use('/produto', _productRouter2.default);
    this.app.use('/usuario', _userRouter2.default);
    this.app.use('/token', _tokenRouter2.default);
  }
}

exports. default = new App().app;
