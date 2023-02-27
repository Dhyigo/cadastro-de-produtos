import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/UserModel';
import statusHttp from '../configs/statusHttp';
import errorsMsg from '../configs/errorsConfig';

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(statusHttp.unauthorized).json({
          errors: [errorsMsg.authentication],
        });
      }

      const user = await User.getUser({ email });
      const passwordIsValid = bcryptjs.compareSync(password, user.password);

      if (!user || !passwordIsValid) {
        return res.status(statusHttp.unauthorized).json({
          errors: [errorsMsg.authentication],
        });
      }

      const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPORATION,
      });

      return res.status(statusHttp.created).json({ token });
    } catch (e) {
      return res.status(statusHttp.internalServerError).json({
        errors: ['Erro ao gerar o token'],
      });
    }
  }
}

export default new TokenController();
