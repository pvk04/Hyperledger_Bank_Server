const { Router } = require("express");
const { UserControllers } = require("../controllers");

const userRouter = Router();

userRouter.post("/login", UserControllers.login);
userRouter.post("/registration", UserControllers.registration);

module.exports = userRouter;
