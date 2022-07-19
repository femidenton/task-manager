const mongoose = require("mongoose");

//connect to db
const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
