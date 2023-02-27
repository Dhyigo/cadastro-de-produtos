"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _UserModel = require('../models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _statusHttp = require('../configs/statusHttp'); var _statusHttp2 = _interopRequireDefault(_statusHttp);
var _errorsConfig = require('../configs/errorsConfig'); var _errorsConfig2 = _interopRequireDefault(_errorsConfig);

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(_statusHttp2.default.unauthorized).json({
          errors: [_errorsConfig2.default.authentication],
        });
      }

      const user = await _UserModel2.default.getUser({ email });
      const passwordIsValid = _bcryptjs2.default.compareSync(password, user.password);

      if (!user || !passwordIsValid) {
        return res.status(_statusHttp2.default.unauthorized).json({
          errors: [_errorsConfig2.default.authentication],
        });
      }

      const token = _jsonwebtoken2.default.sign({ email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPORATION,
      });

      return res.status(_statusHttp2.default.created).json({ token });
    } catch (e) {
      return res.status(_statusHttp2.default.internalServerError).json({
        errors: ['Erro ao gerar o token'],
      });
    }
  }
}

exports. default = new TokenController();
