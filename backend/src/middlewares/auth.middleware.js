const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const Notes = require("../models/notes.model.js");

const isLoggedIn = async (req, res, next) => {
  console.log("middleware reached");
  const accToken = req.cookies["publicKey"];

  if (!accToken) {
    console.log("No access token provided");
    return res.status(401).redirect("/api/user/log-in");
  }

  let tem = await jwt.verify(accToken, process.env.ACCESS_TOKEN_SECRET);
  console.log("tem:", tem);

  const decoded = await jwt.verify(accToken, process.env.ACCESS_TOKEN_SECRET);
  const currentTime = Date.now();
  const tokenExpiration = decoded ? decoded.exp * 1000 : 0;
  try {
    if (!decoded || tokenExpiration < currentTime) {
      console.log("Token expired or invalid");
      res.clearCookie("privateKey");
      return res.status(401).redirect("/api/user/log-in");
    }
    console.log(tokenExpiration - currentTime);

    if (tokenExpiration - currentTime < 30 * 60 * 1000) {
      const user = await User.findOne({email: decoded.email});
      if (!user) {
        console.log("Invalid refresh token or user not found");
        return res.status(401).redirect("/api/user/log-in");
      }
      if (user.refToken !== "") {
        try {
          const ver = await jwt.verify(
            user.refToken,
            process.env.REFRESH_TOKEN_SECRET
          );
          const newAccToken = user.generateAccessToken();
          user.refToken = user.generateRefreshToken();
          res.cookie("publicKey", newAccToken, {httpOnly: true});
          console.log("New access token issued");
        } catch (error) {
          console.log("Error:", error.message);
          res.redirect("/api/user/log-in");
        }
      } else {
        console.log("No refresh token found");
        return res.status(401).redirect("/api/user/log-in");
      }
    }

    const verifiedDecoded = jwt.verify(
      accToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const userExists = await User.findOne({email: verifiedDecoded.email});
    if (!userExists) {
      console.log("User not found");
      return res.status(401).redirect("/api/user/register");
    }

    req.user = userExists;
    next();
  } catch (err) {
    console.log("Error:", err.message);
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
