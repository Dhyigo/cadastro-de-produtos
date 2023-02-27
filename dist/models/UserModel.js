"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _statusHttp = require('../configs/statusHttp'); var _statusHttp2 = _interopRequireDefault(_statusHttp);
var _errorsConfig = require('../configs/errorsConfig'); var _errorsConfig2 = _interopRequireDefault(_errorsConfig);

const userShame = new _mongoose2.default.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  created_at: { type: Date, default: Date.now() },
});

const UserModel = _mongoose2.default.model('users', userShame);

 class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
    this.status = _statusHttp2.default.ok;
  }

  async create() {
    this.validate();

    if (this.errors.length) return;

    if ((await User.getUser({ email: this.body.email }))) {
      this.setError(_errorsConfig2.default.userExists, _statusHttp2.default.conflict);
      return;
    }

    this.body.password = _bcryptjs2.default.hashSync(this.body.password, 8);
    console.log(this.body);

    this.user = await UserModel.create(this.body);
    this.status = _statusHttp2.default.created;
  }

  static async getUser(filter) {
    const user = await UserModel.findOne(filter);
    return user;
  }

  validate() {
    this.clearData();
    const { email, password } = this.body;

    if (!_validator2.default.isEmail(email)) {
      this.setError(_errorsConfig2.default.email, _statusHttp2.default.badRequest);
      return;
    }

    if (password.length < 6) {
      this.setError(_errorsConfig2.default.password, _statusHttp2.default.badRequest);
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
} exports.default = User;
