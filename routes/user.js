const { Router } = require("express");
const { UserControllers } = require("../controllers");

const userRouter = Router();

userRouter.post("/login", UserControllers.login);
userRouter.post("/registration", UserControllers.registration);
userRouter.post("/setRequest", UserControllers.setRequest);
userRouter.get("/getRequests", UserControllers.getRequests);
userRouter.post("/answerRequest", UserControllers.answerRequest);

module.exports = userRouter;
