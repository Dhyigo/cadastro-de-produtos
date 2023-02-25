import User from '../models/UserModel';

class UserController {
  async store(req, res) {
    try {
      const user = new User(req.body);

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

export default new UserController();
