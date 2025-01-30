const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["pending", "interested", "accepted", "rejected"],
        message: "{VALUE} is not supported",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ sender: 1, receiver: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.sender.equals(connectionRequest.receiver)) {
    throw new Error("You cannot send request to yourself");
  }
  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
