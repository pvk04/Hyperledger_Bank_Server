const { Router } = require("express");
const { ShopControllers } = require("../controllers");

const shopRouter = Router();

shopRouter.get("/getShops", ShopControllers.getShops);
shopRouter.post("/setShop", ShopControllers.setShop);
shopRouter.post("/setRate", ShopControllers.setRate);

module.exports = shopRouter;
