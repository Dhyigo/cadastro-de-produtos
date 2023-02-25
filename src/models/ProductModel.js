import mongoose from 'mongoose';
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
  }

  async create() {
    this.validate();

    if (this.errors.length) return;

    if ((await Product.getProduct({ code: this.body.code }))) {
      this.errors.push(errorsMsg.productExists);
      return;
    }

    this.product = await ProductModel.create(this.body);
  }

  static async getAllProducts(page, limit, filter = {}) {
    const count = await ProductModel.countDocuments();

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
    const { code, description, price } = this.body;
    const priceNumber = Number(price);

    if (!code || !description || !priceNumber) {
      this.errors.push(errorsMsg.data);
      return;
    }

    if (priceNumber <= 0) {
      this.errors.push(errorsMsg.price);
    }
  }

  clearData() {
    Object.keys(this.body).forEach((key) => {
      if (typeof this.body[key] !== 'string') this.body[key] = '';
    });

    this.formatBody();
  }

  formatBody() {
    this.body = {
      code: this.body.code,
      description: this.body.description,
      price: this.body.price,
    };
  }
}
