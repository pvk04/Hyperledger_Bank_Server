const { UserServices } = require("../services");

module.exports = class UserControllers {
  static async login(req, res, next) {
    try {
      const { login, password } = req.body;

      const user = await UserServices.login(login, password);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  static async registration(req, res, next) {
    try {
      const { name, login, password } = req.body;

      const user = await UserServices.registration(name, login, password);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }
};
