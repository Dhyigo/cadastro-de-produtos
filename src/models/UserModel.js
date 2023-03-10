import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

import statusHttp from '../configs/statusHttp';
import errorsMsg from '../configs/errorsConfig';

const userShame = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  created_at: { type: Date, default: Date.now() },
});

const UserModel = mongoose.model('users', userShame);

export default class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
    this.status = statusHttp.ok;
  }

  async create() {
    this.validate();

    if (this.errors.length) return;

    if ((await User.getUser({ email: this.body.email }))) {
      this.setError(errorsMsg.userExists, statusHttp.conflict);
      return;
    }

    this.body.password = bcryptjs.hashSync(this.body.password, 8);
    console.log(this.body);

    this.user = await UserModel.create(this.body);
    this.status = statusHttp.created;
  }

  static async getUser(filter) {
    const user = await UserModel.findOne(filter);
    return user;
  }

  validate() {
    this.clearData();
    const { email, password } = this.body;

    if (!validator.isEmail(email)) {
      this.setError(errorsMsg.email, statusHttp.badRequest);
      return;
    }

    if (password.length < 6) {
      this.setError(errorsMsg.password, statusHttp.badRequest);
    }
  }

  clearData() {
    Object.keys(this.body).forEach((key) => {
      if (typeof this.body[key] !== 'string') this.body[key] = '';
    });

    this.formatBody();
  }

  setError(msg, status) {
    this.errors.push(msg);
    this.status = status;
  }

  formatBody() {
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}
