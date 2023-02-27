"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

var _statusHttp = require('../configs/statusHttp'); var _statusHttp2 = _interopRequireDefault(_statusHttp);
var _errorsConfig = require('../configs/errorsConfig'); var _errorsConfig2 = _interopRequireDefault(_errorsConfig);

const productShame = new _mongoose2.default.Schema({
  code: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ProductModel = _mongoose2.default.model('products', productShame);

 class Product {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.product = null;
    this.status = _statusHttp2.default.ok;
  }

  async update(code) {
    this.validateUpdate();

    if (this.errors.length) return;

    if (!(await Product.getProduct({ code }))) {
      this.setError(_errorsConfig2.default.productNotExists, _statusHttp2.default.notFound);
      return;
    }

    this.product = await ProductModel.findOneAndUpdate({ code }, this.body, { new: true });
  }

  async create() {
    this.validate();

    if (this.errors.length) return;

    if ((await Product.getProduct({ code: this.body.code }))) {
      this.setError(_errorsConfig2.default.productExists, _statusHttp2.default.conflict);
      return;
    }

    this.product = await ProductModel.create(this.body);
    this.status = _statusHttp2.default.created;
  }

  static async getAllProducts(page, limit, filter = {}) {
    const count = await ProductModel.countDocuments(filter);

    const products = await ProductModel.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    return { count, products };
  }

  static async getProduct(obj) {
    const product = await ProductModel.findOne(obj);
    return product;
  }

  validate() {
    this.clearData();
    this.formatBody();

    const { code, description, price } = this.body;
    const priceNumber = Number(price);

    if (!code || !description || !priceNumber) {
      this.setError(_errorsConfig2.default.data, _statusHttp2.default.badRequest);
      return;
    }

    if (priceNumber <= 0) {
      this.setError(_errorsConfig2.default.price, _statusHttp2.default.badRequest);
    }
  }

  validateUpdate() {
    this.clearData();

    const { price } = this.body;
    const priceNumber = Number(price);

    if (priceNumber <= 0) {
      this.setError(_errorsConfig2.default.price, _statusHttp2.default.badRequest);
      return;
    }

    this.body = {
      price: priceNumber,
      updated_at: Date.now(),
    };
  }

  clearData() {
    Object.keys(this.body).forEach((key) => {
      if (typeof this.body[key] !== 'string') this.body[key] = '';
    });
  }

  setError(msg, status) {
    this.errors.push(msg);
    this.status = status;
  }

  formatBody() {
    this.body = {
      code: this.body.code,
      description: this.body.description,
      price: this.body.price,
    };
  }
} exports.default = Product;
