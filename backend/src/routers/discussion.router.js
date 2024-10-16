const {Router} = require("express");
const {
  showDiscussion,
  showPublisher,
} = require("../controllers/discussion.controller.js");
const discussionRouter = Router();
discussionRouter.get("/", showDiscussion);
discussionRouter.get("/publisher", showPublisher);
module.exports = discussionRouter;
