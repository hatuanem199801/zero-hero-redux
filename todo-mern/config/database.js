const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
  mongoose
    .connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => console.log(`Connected database`))
    .catch(err => {
      throw err;
      process.exit(1);
    });
};

module.exports = connectDB;
