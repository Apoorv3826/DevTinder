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
      min: 18,
    },

    bio: {
      type: String,
      maxLength: 250,
      default: "This is the default bio",
    },

    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },

    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
    },

    skills: [String],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
