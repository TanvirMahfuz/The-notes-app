const Notes = require("../models/notes.model");
const storeComment = async (req, res) => {
  const note = await Notes.findByIdAndUpdate(
    req.body.noteId,
    {
      $push: {
        comments: {
          commenterName: "jackell",
          comment: req.body.comment,
        },
      },
    },
    {new: true}
  );
  if (!note) res.status(404).json({message: "note not found"});
  return res.redirect(`/api/notes/${note.name}`);
};

const getNote = async (req, res) => {
  try {
    console.log("disscussion");
    const note = await Notes.find({name: req.params.name});
    if (!note) res.status(404).json({message: "note not found"});
    res.render("discussion", {data: note});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "internal server error"});
  }
};

const createNote = async (req, res) => {
  try {
    const note = await Notes.create({
      name: req.body.name,
      publisher: req.body.publisher,
      description: req.body.description,
      comments: [],
    });
    res.redirect(`/api/notes/${note.name}`);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "internal server error"});
  }
};
module.exports = {storeComment, getNote, createNote};
