const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const validate = require("./utils/validate");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //validate the request
    validate(req.body);
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

    await user.save();
    res.status(201).send({ message: "User created successfully", user });
  } catch (err) {
    res.send(err.message);
  }
});

// login user
app.get("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      res.send("Invalid Credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      res.send("Login Success");
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.send(err.message);
  }
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
