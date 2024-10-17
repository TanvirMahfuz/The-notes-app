const {Router} = require("express");
const userRouter = Router();
const {
  logIn,
  register,
  logOut,
  profileView,
  getUserEditPage,
  updateUser,
} = require("../controllers/user.controller.js");
const {isLoggedIn} = require("../middlewares/auth.middleware.js");
const {imageUpload} = require("../middlewares/multer.middleware.js");

userRouter.get("/", isLoggedIn, profileView);
userRouter.get("/edit", isLoggedIn, getUserEditPage);
userRouter.post("/edit", isLoggedIn, imageUpload, updateUser);
//
userRouter.get("/log-in", (req, res) => {
  res.render("logIn");
});
userRouter.post("/log-in", logIn);

userRouter.get("/log-out", isLoggedIn, logOut);

userRouter.get("/register", (req, res) => {
  res.render("register");
});
userRouter.post("/register", register);

module.exports = userRouter;
