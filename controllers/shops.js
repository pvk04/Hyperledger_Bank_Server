const ShopServices = require("../services/shop");

module.exports = class ShopsControllers {
  static async getShops(req, res, next) {
    try {
      const { org, login } = req.body;

      const shops = await ShopServices.getShops(org, login);

      res.json(shops);
    } catch (e) {
      next(e);
    }
  }

  static async setShop(req, res, next) {
    const { org, login, role, city } = req.body;

    const shops = await ShopServices.setShop(org, login, role, city);

    res.json(shops);
  }

  static async setRate(req, res, next) {
    try {
      const { login, shopId, rate, text } = req.body;

      const shops = await ShopServices.setRate(login, shopId, rate, text);

      res.json(shops);
    } catch (e) {
      console.log(e);
    }
  }
};
