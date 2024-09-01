const Notes = require("../models/notes.model");
const showDiscussion = async (req, res) => {
  try {
    console.log("disscussion from discussion.controller.js");
    const notes = await Notes.find();
    if (!notes) res.status(404).json({message: "note not found"});
    console.log(notes);
    res.render("discussion", {data: notes});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "internal server error"});
  }
};
module.exports = {showDiscussion};
