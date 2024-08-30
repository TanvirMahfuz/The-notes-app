const {Router} = require("express");
const router = Router();
const {isLoggedIn} = require("../middlewares/auth.middleware.js");
router.use("/home", isLoggedIn, require("./home.router.js"));
router.use("/user", require("./user.router.js"));
router.use("/notes", require("./notes.router.js"));
router.use("/discussion", require("./discussion.router.js"));

module.exports = router;
