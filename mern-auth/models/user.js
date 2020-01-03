const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  date_create: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", userSchema);
