const express = require("express");
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

// fetching all the requests which are not accepted or rejected by this user.
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      receiver: loggedInUser._id,
      status: "interested",
    }).populate("sender", "firstName lastName skills bio");

    res.json({ message: "Data fetched", data: connectionRequest });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// fetching all the accepted connections of this user.
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { sender: loggedInUser._id, status: "accepted" },
        { receiver: loggedInUser._id, status: "accepted" },
      ],
    }).populate("sender", "firstName lastName skills bio");

    const data = connectionRequest.map((row) => {
      if (row.sender._id.toString() === loggedInUser._id.toString()) {
        return row.receiver;
      }

      return row.sender;
    });

    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ sender: loggedInUser._id }, { receiver: loggedInUser._id }],
    })
      .select("sender receiver")
      .skip(skip)
      .limit(limit);

    const hiddenUsersFromFeed = new Set();

    connectionRequest.forEach((req) => {
      hiddenUsersFromFeed.add(req.sender.toString());
      hiddenUsersFromFeed.add(req.receiver.toString());
    });

    console.log(hiddenUsersFromFeed);

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select("firstName lastName skills bio");
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;
