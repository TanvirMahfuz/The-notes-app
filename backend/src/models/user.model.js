const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    refToken: {
      type: String,
    },
  },
  {timestamps: true}
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.refToken = await this.generateRefreshToken();
  next();
});
userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign({email: this.email}, "the secret of victor", {
    expiresIn: "30d",
  });
};
userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {name: this.name, email: this.email},
    "the secret of frankenstein",
    {
      expiresIn: "1d",
    }
  );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
