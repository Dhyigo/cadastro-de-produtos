"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _UserModel = require('../models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

class UserController {
  async store(req, res) {
    try {
      const user = new (0, _UserModel2.default)(req.body);

      await user.create();

      if (user.errors.length) {
        return res.status(user.status).json({
          errors: user.errors,
        });
      }

      return res.status(user.status).json({ success: ['usuário foi criado com sucesso.'] });
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao criar usuário'],
      });
    }
  }
}

exports. default = new UserController();
