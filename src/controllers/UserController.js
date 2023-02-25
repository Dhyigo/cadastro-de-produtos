import User from '../models/UserModel';

class UserController {
  async store(req, res) {
    const user = new User(req.body);

    await user.create();

    res.json(user);
  }
}

export default new UserController();
