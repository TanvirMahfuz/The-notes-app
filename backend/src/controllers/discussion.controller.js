const Notes = require("../models/notes.model");
const {getUserByEmail} = require("../service/user.service.js");
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

const showPublisher = async (req, res) => {
  try {
    const email = req.query.user;
    console.log(email);
    const user = await getUserByEmail(email);
    if (!user) res.status(404).json({message: "note not found"});
    console.log(user);
    const notes = [];
    for (let note of user.notes) {
      notes.push(await Notes.findById(note));
    }
    return res.render("publisher", {user: user, notes: notes});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "internal server error"});
  }
};
module.exports = {showDiscussion, showPublisher};
