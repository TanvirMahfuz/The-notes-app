const {Router} = require("express");
const notesRouter = Router();
const Notes = require("../models/notes.model");
const {
  storeComment,
  getNote,
  createNote,
} = require("../controllers/note.controller.js");
notesRouter.get("/:name", getNote);
notesRouter.post("/comment", storeComment);
notesRouter.get("/new-note", (req, res) => {
  console.log("new note");
  res.render("takenotes");
});
notesRouter.post("/new-note", createNote);
module.exports = notesRouter;
