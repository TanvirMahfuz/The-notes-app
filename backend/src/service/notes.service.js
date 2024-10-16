const Notes = require("../models/notes.model");
const {popNote} = require("./user.service.js");
const {matchName} = require("../utility/matchName.utility.js");
const createNote = async (email, topic, description, fileName) => {
  const note = {
    name: topic,
    publisher: email,
    description: description?.length > 0 ? description : "No description",
    comments: [],
    attachedPdf: fileName,
  };
  return await Notes.create(note);
};

const getNotesByName = async (noteName) => {
  try {
    let params = await Notes.find();
    const notes = await matchName(noteName, params);
    return notes;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const storeComment = async (noteId, comment) => {
  return await Notes.findByIdAndUpdate(
    noteId,
    {
      $push: {
        comments: {
          ...comment,
        },
      },
    },
    {new: true}
  );
};

const updateOneNote = async (req) => {
  data = req.body;
  try {
    const updatedNote = {
      name: data.name && data.name.length > 0 ? data.name : null,
      description:
        data.description && data.description.length > 0
          ? data.description
          : null,
      attachedPdf: req.file?.filename,
    };

    for (const key in updatedNote) {
      if (updatedNote[key] === null) {
        delete updatedNote[key];
      }
    }
    console.log(updatedNote);

    console.log(data.id);
    const newNote = await Notes.findByIdAndUpdate(data.id, updatedNote, {
      new: true,
    });
    if (!newNote) return null;
    return newNote;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
const eraseNote = async (noteId) => {
  const publisher = await Notes.findById(noteId).select("publisher");
  const user = await popNote(publisher.publisher, noteId);
  if (!user) return null;
  return await Notes.findByIdAndDelete(noteId, {new: true});
};
module.exports = {
  createNote,
  getNotesByName,
  storeComment,
  updateOneNote,
  eraseNote,
};
