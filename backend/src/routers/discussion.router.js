const {Router} = require("express");
const {showDiscussion} = require("../controllers/discussion.controller.js");
const discussionRouter = Router();
discussionRouter.get("/", showDiscussion);
module.exports = discussionRouter;
