const Notes = require("../models/notes.model");
const path = require("path");
const {updateUserNote} = require("../service/user.service.js");

const storeComment = async (req, res) => {
  const {storeComment} = require("../service/notes.service.js");
  const note = await storeComment(req.body.noteId, {
    commenterName: req.user.name,
    comment: req.body.comment,
  });
  if (!note) res.status(404).json({message: "note not found"});
  return res.redirect(`/api/notes/${note.name}`);
};

const getNote = async (req, res) => {
  try {
    const note = await Notes.find({name: req.params.name});
    if (!note) res.status(404).json({message: "note not found"});
    res.render("discussion", {data: note});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "internal server error"});
  }
};

const createNote = async (req, res) => {
  const {createNote} = require("../service/notes.service.js");
  try {
    const {topic, description} = req.body;
    const fileName = req.file?.filename;
    console.log(req.file.filename);
    const newNote = await createNote(
      req.user.email,
      topic,
      description,
      fileName
    );
    if (!newNote) res.status(500).json({message: "could not create note"});

    const user = await updateUserNote(req.user.email, newNote._id);
    if (!user) res.status(500).json({message: "could not update user"});

    const savedNote = await newNote.save();
    if (!savedNote) res.status(500).json({message: "could not save"});

    return res.redirect(`/api/notes/new-note`);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message: "internal server error"});
  }
};
module.exports = {storeComment, getNote, createNote};
