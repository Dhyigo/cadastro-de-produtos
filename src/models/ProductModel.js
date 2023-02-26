import mongoose from 'mongoose';

import statusHttp from '../configs/statusHttp';
import errorsMsg from '../configs/errorsConfig';

const productShame = new mongoose.Schema({
  code: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model('products', productShame);

export default class Product {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.product = null;
    this.status = statusHttp.ok;
  }

  async update(code) {
    this.validateUpdate();

    if (this.errors.length) return;

    if (!(await Product.getProduct({ code }))) {
      this.setError(errorsMsg.productNotExists, statusHttp.notFound);
      return;
    }

    this.product = await ProductModel.findOneAndUpdate({ code }, this.body, { new: true });
  }

  async create() {
    this.validate();

    if (this.errors.length) return;

    if ((await Product.getProduct({ code: this.body.code }))) {
      this.setError(errorsMsg.productExists, statusHttp.conflict);
      return;
    }

    this.product = await ProductModel.create(this.body);
    this.status = statusHttp.created;
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
      this.setError(errorsMsg.data, statusHttp.badRequest);
      return;
    }

    if (priceNumber <= 0) {
      this.setError(errorsMsg.price, statusHttp.badRequest);
    }
  }

  validateUpdate() {
    this.clearData();

    const { price } = this.body;
    const priceNumber = Number(price);

    if (priceNumber <= 0) {
      this.setError(errorsMsg.price, statusHttp.badRequest);
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
}
