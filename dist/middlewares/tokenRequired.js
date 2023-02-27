"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _statusHttp = require('../configs/statusHttp'); var _statusHttp2 = _interopRequireDefault(_statusHttp);
var _errorsConfig = require('../configs/errorsConfig'); var _errorsConfig2 = _interopRequireDefault(_errorsConfig);

exports. default = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(_statusHttp2.default.unauthorized).json({
        errors: [_errorsConfig2.default.token],
      });
    }

    const token = authorization.split(' ')[1];
    const { email } = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);

    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(_statusHttp2.default.unauthorized).json({
      errors: [_errorsConfig2.default.token],
    });
  }
};
