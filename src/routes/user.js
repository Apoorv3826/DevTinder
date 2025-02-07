const express = require("express");
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/user");
const userRouter = express.Router();
const mongoose = require("mongoose");

// fetching all the requests which are not accepted or rejected by this user.
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      receiver: loggedInUser._id,
      status: "interested",
    }).populate("sender", "firstName lastName skills bio age gender photoUrl");

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
    }).populate("sender", "firstName lastName skills bio age gender photoUrl");

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

// Fetching the data to be shown on feed page.
userRouter.get("/user/feed", userAuth, async (req, res) => {
  // User should not see people in their feed whom:
  // 1. They have sent a connection request to.
  // 2. They have received a connection request from.
  // 3. They are already connected to.
  // 4. They are themselves.

  // Other than these, all users using our app (are in our database record) should be visible in the feed.
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch connections of the logged-in user
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ sender: loggedInUser._id }, { receiver: loggedInUser._id }],
    }).select("sender receiver");

    // Collect IDs of users to exclude
    const hiddenUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hiddenUsersFromFeed.add(req.sender.toString());
      hiddenUsersFromFeed.add(req.receiver.toString());
    });

    // Convert to ObjectId array for MongoDB filtering
    const hiddenUsersArray = [...hiddenUsersFromFeed].map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Fetch users excluding hidden ones
    const users = await User.find({
      _id: { $nin: hiddenUsersArray, $ne: loggedInUser._id },
    })
      .select("firstName lastName skills bio photoUrl age gender")
      .skip(skip)
      .limit(limit);

    res.json({ message: "Feed fetched", data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;
