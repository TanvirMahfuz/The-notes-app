const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const Notes = require("../models/notes.model.js");
const isLoggedIn = async (req, res, next) => {
  const accToken = req.cookies["publicKey"];
  const refToken = req.cookies["privateKey"];

  if (!accToken) {
    if (!refToken) {
      return res.redirect("/api/user/log-in");
    } else {
      try {
        console.log("refreshing public key");
        const decoded = await jwt.verify(refToken, "the secret of victor");
        console.log(decoded);
        if (!decoded) {
          return res.status(401).json({message: "Invalid refresh token"});
        }
        const user = await User.findOne({email: decoded.email});

        if (!user) {
          return res.status(401).json({message: "Invalid refresh token"});
        }

        const newAccToken = jwt.sign(
          {id: user._id, email: user.email},
          "the secret of frankenstein",
          {expiresIn: "1d"}
        );

        res.cookie("publicKey", newAccToken);

        req.user = user;
        return next();
      } catch (error) {
        console.log("refToken" + error.message);

        return res.redirect("/api/user/log-in");
      }
    }
  }

  try {
    const decoded = jwt.decode(accToken);
    if (decoded.exp * 1000 < Date.now()) {
      console.log("Token expired");
      res.clearCookie("publicKey");
      res.clearCookie("privateKey");
      return res.status(401).redirect("/api/user/log-in");
    }

    // If not expired, proceed with verification
    jwt.verify(accToken, "the secret of frankenstein");
    console.log("decoded after verify", decoded);
    const user = await User.findOne({email: decoded.email});
    if (!user) {
      return res.status(401).redirect("/api/user/register");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("accToken error:", error.message);
    return res.status(401).redirect("/api/user/register");
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
