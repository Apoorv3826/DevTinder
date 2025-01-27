const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://singhapoorv350:SXmLnW4X4nLWVS5G@cluster0.i4vxn.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
