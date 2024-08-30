const {Router} = require("express");
const homeRouter = Router();
const Notes = require("../models/notes.model.js");

homeRouter.get("/", async (req, res) => {
  const notes = await Notes.find({});
  if (!notes) {
    res.status(404).send("No notes found");
  }
  return res.render("home", {data: notes});
});
module.exports = homeRouter;
