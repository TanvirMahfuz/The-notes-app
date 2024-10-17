const Notes = require("../models/notes.model");

const {updateUserNote} = require("../service/user.service.js");
const {updateOneNote, eraseNote} = require("../service/notes.service.js");

const storeComment = async (req, res) => {
  const {storeComment} = require("../service/notes.service.js");
  const note = await storeComment(req.body.noteId, {
    commenterName: req.user.email,
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
const updateNote = async (req, res) => {
  const updatedNote = await updateOneNote(req);
  if (!updatedNote) return res.status(404).json({msg: "note not found"});
  console.log(updatedNote);
  return res.status(200).json({msg: "user updated successfully"});
};

const getEditPage = async (req, res) => {
  try {
    const note = await Notes.findOne({_id: req.query.id});
    if (!note) {
      return res.status(404).json({message: "Note not found"});
    }

    if (req.cookies["publicKey"]) {
      return res
        .cookie("publicKey", req.cookies["publicKey"])
        .render("updateNotes", {note: note});
    }
    return res.render("updateNotes", {note: note});
  } catch (error) {
    console.error("Error fetching note:", error);
    return res.status(500).json({message: "Server error"});
  }
};

const removeNote = async (req, res) => {
  const note = await eraseNote(req.query.id);
  if (!note) return res.status(404).json({message: "note not found"});
  return res.status(200).json({message: "note deleted"});
};

module.exports = {
  storeComment,
  getNote,
  createNote,
  updateNote,
  getEditPage,
  removeNote,
};
