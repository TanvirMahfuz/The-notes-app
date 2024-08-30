const {Router} = require("express");
const userRouter = Router();
const {logIn, register, logOut} = require("../controllers/user.controller.js");
userRouter.get("/log-in", (req, res) => {
  res.render("logIn");
});
userRouter.post("/log-in", logIn);
userRouter.get("/log-out", logOut);
userRouter.post("/register", register);
module.exports = userRouter;
