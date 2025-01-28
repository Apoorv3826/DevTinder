const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  await user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// find single user based on emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  await User.findOne({ emailId: userEmail })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// find all users
app.get("/feed", async (req, res) => {
  await User.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// delete user based on userId
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  const user = User.findByIdAndDelete(userId);
  await user
    .then((result) => {
      res.send(result);
      console.log("User deleted successfully");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const user = User.findByIdAndUpdate(userId, req.body, {
    runValidators: true,
  });
  await user
    .then((result) => {
      res.send(result);
      console.log("User updated successfully");
    })
    .catch((err) => {
      res.send(err);
    });
});

connectDB()
  .then(() => {
    console.log("Database connected");

    app.listen("7777", () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log(err);
  });
