const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Apoorv",
    lastName: "Singh",
    emailId: "singhapoorv@gmail.com",
    password: "password",
  });

  await user
    .save()
    .then((result) => {
      res.send(result);
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
