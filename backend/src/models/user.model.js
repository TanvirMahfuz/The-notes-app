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
    profileImage: {
      type: String,
      default: "Portrait_Placeholder.png",
    },
    designation: {
      type: String,
    },
    emoji: {
      type: String,
    },
    github: {
      type: String,
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
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  const reftoken = this.generateRefreshToken();
  next();
});
userSchema.methods.generateRefreshToken = async function () {
  this.refToken = await jwt.sign(
    {email: this.email},
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    }
  );
  return this.refToken;
};
userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {name: this.name, email: this.email},
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    }
  );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
