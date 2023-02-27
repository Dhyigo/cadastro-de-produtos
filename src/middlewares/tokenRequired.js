import jwt from 'jsonwebtoken';

import statusHttp from '../configs/statusHttp';
import errorsMsg from '../configs/errorsConfig';

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(statusHttp.unauthorized).json({
        errors: [errorsMsg.token],
      });
    }

    const token = authorization.split(' ')[1];
    const { email } = jwt.verify(token, process.env.TOKEN_SECRET);

    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(statusHttp.unauthorized).json({
      errors: [errorsMsg.token],
    });
  }
};
