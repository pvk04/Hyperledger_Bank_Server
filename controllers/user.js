const { UserServices } = require("../services");

module.exports = class UserControllers {
  static async login(req, res, next) {
    try {
      const { login, password, org } = req.body;

      const user = await UserServices.login(login, password, org);

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

  static async getUsers(req, res, next) {
    try {
      const users = await UserServices.getUsers();

      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  static async setRequest(req, res, next) {
    try {
      const { login, role, shopId } = req.body;

      const requests = await UserServices.setRequest(login, role, shopId);

      res.json(requests);
    } catch (e) {
      next(e);
    }
  }

  static async getRequests(req, res, next) {
    try {
      const requests = await UserServices.getRequests();

      res.json(requests);
    } catch (e) {
      next(e);
    }
  }

  static async answerRequest(req, res, next) {
    try {
      const { login, id, answer } = req.body;

      const requests = await UserServices.answerRequest(login, id, answer);

      res.json(requests);
    } catch (e) {
      next(e);
    }
  }
};
