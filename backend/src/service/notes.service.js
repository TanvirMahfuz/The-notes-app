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

const updateOneNote = async (data) => {
  try {
    const updatedNote = {
      name: data.name && data.name.length > 0 ? data.name : null,
      description:
        data.description && data.description.length > 0
          ? data.description
          : null,
    };
    for (const key in updatedNote) {
      if (updatedNote[key] === null) {
        delete updatedNote[key];
      }
    }
    console.log(updatedNote);
    const newNote = await Notes.findByIdAndUpdate(data._id, updatedNote, {
      new: true,
    });
    if (!newNote) return null;
    return newNote;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

module.exports = {
  createNote,
  getNote,
  storeComment,
  updateOneNote,
};
