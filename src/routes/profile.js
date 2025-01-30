const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const { profileUpdateValidation } = require("../utils/validate");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    const isValidate = profileUpdateValidation(req);
    if (!isValidate) {
      return res.status(400).send("Invalid updates");
    }
    const user = req.user;

    Object.keys(req.body).forEach((update) => {
      user[update] = req.body[update];
    });

    res
      .status(200)
      .json({ message: `Profile updated for ${user.firstName}`, user });

    await user.save();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});

module.exports = profileRouter;
