const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const profileView = async (req, res) => {
  console.log(req.user);
  return res.render("profile", {user: req.user});
};

const register = async (req, res) => {
  const {name, email, password, confirmPassword} = req.body;
  console.log(req.body);
  if (password !== confirmPassword) {
    return res.status(400).json({message: "Password does not match"});
  }
  const user = new User({name, email, password});
  try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: "Email already exists"});
    }

    const savedUser = await user.save();
    console.log(savedUser);
    return res
      .status(200)
      .cookie("publicKey", await savedUser.generateAccessToken())
      .cookie("privateKey", savedUser.refToken)
      .redirect("/api/home");
  } catch (error) {
    console.error("Error while saving user:", error.message); // Log the error
    return res.status(500).json({message: "Error while saving data"});
  }
};

const logIn = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(403).json("Password did not match");
    }

    const refreshToken = await user.generateRefreshToken();
    user.refToken = refreshToken;
    await user.save();

    const accToken = await user.generateAccessToken();
    console.log(jwt.verify(accToken, "the secret of frankenstein"));
    return res
      .cookie("publicKey", accToken)
      .cookie("privateKey", refreshToken)
      .redirect("/api/home");
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({message: "Internal server error"});
  }
};

const logOut = async (req, res) => {
  res.clearCookie("publicKey");
  res.clearCookie("privateKey");
  return res.redirect("/api/home");
};
module.exports = {logIn, register, logOut, profileView};
