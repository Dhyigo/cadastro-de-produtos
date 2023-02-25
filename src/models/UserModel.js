import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

import errorsMsg from '../configs/errorsConfig';

const userShame = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  created_at: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model('users', userShame);

export default class Product {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async create() {
    this.validate();

    if (this.errors.length) return;

    if ((await UserModel.findOne({ email: this.body.email }))) {
      this.errors.push(errorsMsg.userExists);
      return;
    }

    this.body.password = bcryptjs.hashSync(this.body.password, 8);
    console.log(this.body);

    this.user = await UserModel.create(this.body);
  }

  validate() {
    this.clearData();
    const { email, password } = this.body;

    if (!validator.isEmail(email)) {
      this.errors.push(errorsMsg.email);
      return;
    }

    if (password.length < 6) {
      this.errors.push(errorsMsg.password);
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
      email: this.body.email,
      password: this.body.password,
    };
  }
}
