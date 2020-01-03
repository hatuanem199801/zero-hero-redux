const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose
      .connect(config.get("mongoUri"), {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log(`Connected database`))
      .catch(err => console.error(err));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
