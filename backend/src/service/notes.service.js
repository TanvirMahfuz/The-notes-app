const Notes = require("../models/notes.model");

const createNote = async (topic, description, fileName) => {
  const note = {
    name: topic,
    publisher: req.user.email,
    description: description?.length > 0 ? description : "No description",
    comments: [],
    attachedPdf: fileName,
  };
  return await Notes.create(note);
};
const getNote = async (noteId) => {};
const storeComment = async (noteId, comment) => {
  return (note = await Notes.findByIdAndUpdate(
    noteId,
    {
      $push: {
        comments: {
          ...comment,
        },
      },
    },
    {new: true}
  ));
};
module.exports = {
  createNote,
  getNote,
  storeComment,
};
