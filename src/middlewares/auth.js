const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    console.log("Checking authentication...");
    const { token } = req.cookies;
    if (!token) {
      console.log("❌ No token found");
      return res.status(401).send("Unauthorized");
    }

    const payload = await jwt.verify(token, "Apoorv7389");
    console.log("🔑 Token Decoded:", payload);

    const user = await User.findOne({ _id: payload._id });

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    console.log("✅ User authenticated:", req.user.emailId);
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = userAuth;
