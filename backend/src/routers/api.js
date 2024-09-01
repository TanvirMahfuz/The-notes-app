const {Router} = require("express");
const {isLoggedIn} = require("../middlewares/auth.middleware.js");
const router = Router();

router.use("/home", isLoggedIn, require("./home.router.js"));
router.use("/user", require("./user.router.js"));
router.use("/notes", isLoggedIn, require("./notes.router.js"));
router.use("/discussion", isLoggedIn, require("./discussion.router.js"));

module.exports = router;
