const User = require("../models/user.model.js");

const updateUserNote = async (email, noteId) => {
  try {
    const user = await User.findOneAndUpdate(
      {email: email},
      {$push: {notes: noteId}},
      {new: true}
    );
    if (!user) return null;
    return user;
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: "Internal server error"});
  }
};

module.exports = {
  updateUserNote,
};
