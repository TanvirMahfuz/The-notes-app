const {Router} = require("express");
const {searchItem} = require("../controllers/search.controller.js");
const homeRouter = Router();
const Notes = require("../models/notes.model.js");
homeRouter.get("/", async (req, res) => {
  const notes = await Notes.find({});
  if (!notes) {
    res.status(404).send("No notes found");
  }
  if (req.cookies["publicKey"]) {
    return res
      .cookie("publicKey", req.cookies["publicKey"])
      .render("home", {data: notes});
  }
  return res.render("home", {data: notes});
});
homeRouter.post("/search", searchItem);
module.exports = homeRouter;
