const ShopServices = require("../services/shop");

module.exports = class ShopsControllers {
  static async getShops(req, res, next) {
    try {
      const shops = await ShopServices.getShops();

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
      next(e);
    }
  }

  static async likeRate(req, res, next) {
    try {
      const { shopId, login, rateId, isLike } = req.body;

      const shops = await ShopServices.likeRate(shopId, login, rateId, isLike);

      res.json(shops);
    } catch (e) {
      next(e);
    }
  }
};
