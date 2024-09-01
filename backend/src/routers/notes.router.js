const {Router} = require("express");
const notesRouter = Router();
const Notes = require("../models/notes.model");
const {isLoggedIn} = require("../middlewares/auth.middleware.js");
const {pdfUpload, imageUpload} = require("../middlewares/multer.middleware.js");
const {
  storeComment,
  getNote,
  createNote,
} = require("../controllers/note.controller.js");

notesRouter.post("/comment", storeComment);
notesRouter.get("/new-note", (req, res) => {
  console.log("new note");
  res.render("takenotes");
});
notesRouter.post("/new-note", pdfUpload, createNote);
notesRouter.get("/:name", getNote);

module.exports = notesRouter;
