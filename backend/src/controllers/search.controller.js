const {getNotesByName} = require("../service/notes.service.js");
const {getUserByEmail} = require("../service/user.service.js");
const searchItem = async (req, res) => {
  try {
    console.log(req.body);
    const {searchParam, searchValue} = req.body;
    if (searchParam === "topic") {
    } else if (searchParam === "email") {
      return res.redirect(
        `/api/discussion/publisher?user=${searchValue.trim()}`
      );
    } else if (searchParam === "note") {
      const notes = await getNotesByName(searchValue);
      if (notes.length === 0) {
        return res.redirect("/api/home");
      }
      console.log(notes);
      return res.render("discussion", {data: notes});
    } else {
      return res.redirect("/api/home");
    }
  } catch (error) {
    console.error("Error searching notes:", error);
    return res.status(500).json({message: "Server error"});
  }
};
module.exports = {searchItem};
