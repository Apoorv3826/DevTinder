const express = require("express");
const { UserValidate } = require("../utils/validate");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// signup user
authRouter.post("/signup", async (req, res) => {
  try {
    //validate the request
    UserValidate(req.body);
    // Encrypt the password
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    // save the user to the database
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      age,
      gender,
    });

    const savedUser = await user.save();
    const token = await jwt.sign({ _id: savedUser._id }, "Apoorv7389");
    res.cookie("token", token);

    return res.json({ message: "User Added Successfully!", data: savedUser });
  } catch (err) {
    return res.status(400).send("Error : " + err.message);
  }
});

// login user
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = await jwt.sign({ _id: user._id }, "Apoorv7389");
      res.cookie("token", token);
      return res.status(200).send(user);
    } else {
      return res.send("Invalid Credentials");
    }
  } catch (err) {
    return res.send(err.message);
  }
});

//logout user
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  return res.status(200).send("Logged out successfully");
});

module.exports = authRouter;
