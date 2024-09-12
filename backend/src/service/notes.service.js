const Notes = require("../models/notes.model");

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
const getNote = async (noteId) => {};
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
module.exports = {
  createNote,
  getNote,
  storeComment,
};
