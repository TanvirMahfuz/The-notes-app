const {Router} = require("express");
const notesRouter = Router();
const Notes = require("../models/notes.model");
const {isOwner} = require("../middlewares/auth.middleware.js");
const {pdfUpload, imageUpload} = require("../middlewares/multer.middleware.js");
const {
  storeComment,
  getNote,
  createNote,
  updateNote,
  getEditPage,
  removeNote,
} = require("../controllers/note.controller.js");

notesRouter.post("/comment", storeComment);
notesRouter.get("/new-note", (req, res) => {
  res.render("takenotes");
});
notesRouter.post("/new-note", pdfUpload, createNote);
notesRouter.get("/edit-page", isOwner, getEditPage);
notesRouter.post("/edit-page", isOwner, pdfUpload, updateNote);
notesRouter.delete("/edit-page", isOwner, removeNote);
notesRouter.get("/:name", getNote);

module.exports = notesRouter;
