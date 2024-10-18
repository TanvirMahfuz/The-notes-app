const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const Notes = require("../models/notes.model.js");

const isLoggedIn = async (req, res, next) => {
  console.log("middleware reached");
  const accToken = req.cookies["publicKey"];
  console.log(accToken);
  if (!accToken) {
    return res.redirect("/api/user/log-in");
  }
  try {
    const decoded = jwt.verify(accToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({email: decoded.email});

    const currentTime = Date.now();
    console.log(decoded.exp * 1000 - currentTime);
    if (decoded.exp * 1000 - currentTime < 20 * 60 * 1000) {
      try {
        const verRef = jwt.verify(
          user.refToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        const newAccToken = await user.generateAccessToken();
        console.log(newAccToken);
        console.log("\nthe url: ", req.url);
        req.cookies["publicKey"] = newAccToken;
        console.log(req.cookies["publicKey"]);
      } catch (err) {
        console.log("error in the 2nd try block", err.message);
        return res.redirect("/api/user/log-in");
      }
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error is in the first try block: ", error.message);
    return res.redirect("/api/user/log-in");
  }
};

const isOwner = async (req, res, next) => {
  console.log(req.body);
  let params = req.query.id;
  if (params === undefined) params = req.body.id;

  const note = await Notes.findOne({_id: params});

  if (!note)
    return res.status(404).json({message: "middleware error: note not found"});
  if (note.publisher !== req.user.email) {
    return res.status(401).json({message: "unauthorized"});
  }
  next();
};
module.exports = {isLoggedIn, isOwner};
