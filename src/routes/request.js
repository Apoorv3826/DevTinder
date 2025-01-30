const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/user");
const express = require("express");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:receiverId",
  userAuth,
  async (req, res) => {
    try {
      const sender = req.user._id;
      const receiver = req.params.receiverId;
      const status = req.params.status;

      const allowedStatus = ["pending", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid status");
      }

      const toUser = await User.findById(receiver);
      if (!toUser) {
        return res.status(404).send("User not found");
      }

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      });

      if (existingRequest) {
        return res.status(400).send("Request already exists");
      }

      const connectionRequest = new ConnectionRequest({
        sender,
        receiver,
        status,
      });

      const data = await connectionRequest.save();

      res.json({ message: "Request sent successfully", data });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

module.exports = requestRouter;
