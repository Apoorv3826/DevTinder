const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      min: 4,
      max: 12,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },

    bio: {
      type: String,
      maxLength: 250,
      default: "This is the default bio",
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "others"],
    },

    skills: [String],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
