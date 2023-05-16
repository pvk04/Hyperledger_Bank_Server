const { Router } = require("express");
const userRouter = require("./user");
const shopRouter = require("./shops");

const routes = Router();

routes.use("/auth", userRouter);
routes.use("/shops", shopRouter);

module.exports.routes = routes;
