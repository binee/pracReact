const mongoose = require("mongoose");
let validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { check, validationResult } = require('express-validator');

console.log(process.env);
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      requied: true,
    },
    password: {
      type: String,
      trim: true,
      requied: [true, "Enter a password"],
      minLength: [6, "Password should be at least six characters"],
    },
    email: {
      type: String,
      trim: true,
      require: [true, "Enter an email Address"],
      unique: [true, "Email Address already Exists"],
      lowercase: true,
      validate: (value) => {
        return validator.isEmail(value);
      },
    },
    contactNumber: {
      type: Number,
      trim: true,
      require: [true, "Enter an Contact Number"],
      unique: [true, "Contact Number already Exists"],
    },
    token: {
      type: String,
      requied: true,
    },
    avatar: {
      type: String,
    },
    carsSeller: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "car",
      },
    ],
    carsBuyer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "car",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// userSchema.methods.generateToken = async function() {
userSchema.pre("save", async function (next) {
  try {
    const jwtToken = await jwt.sign(
      { _id: this._id },
      process.env.SECRET_TOKEN,
        { expiresIn: 360000 },
      (err, token) => {
          if (err) throw err;
          //res.json({ token });
        }
    );
    this.token = jwtToken;
    return jwtToken;
  } catch (error) {
    console.log(error);
  }
  next();
});
const User = mongoose.model("user", userSchema);
module.exports = User;
