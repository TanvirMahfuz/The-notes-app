const {Router} = require("express");
const userRouter = Router();
const {
  logIn,
  register,
  logOut,
  profileView,
} = require("../controllers/user.controller.js");
const {isLoggedIn} = require("../middlewares/auth.middleware.js");
userRouter.get("/", isLoggedIn, profileView);
userRouter.get("/log-in", (req, res) => {
  res.render("logIn");
});
userRouter.post("/log-in", logIn);
userRouter.get("/log-out", isLoggedIn, logOut);
userRouter.post("/register", register);
userRouter.get("/register", (req, res) => {
  res.render("register");
});
module.exports = userRouter;
