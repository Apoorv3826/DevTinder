const express = require("express");

const app = express();

app.use(
  "/",
  (req, res, next) => {
    //res.send("Hello from the first request handler");
    next();
  },
  (req, res) => {
    res.send("Hello from the second request handler");
  }
);

app.listen("7777", () => {
  console.log("Server is running on port 7777");
});
