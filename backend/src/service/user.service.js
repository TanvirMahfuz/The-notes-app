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

const popNote = async (email, noteId) => {
  try {
    const user = await User.findOneAndUpdate(
      {email: email},
      {$pull: {notes: noteId}},
      {new: true}
    );
    if (!user) return null;
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({email: email});
    if (!user) return null;
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
const updateUserByEmail = async (email, data) => {
  try {
    console.log(data);
    const user = await User.findOneAndUpdate({email: email}, data, {
      new: true,
    });
    if (!user) return null;
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
module.exports = {
  updateUserNote,
  popNote,
  getUserByEmail,
  updateUserByEmail,
};
