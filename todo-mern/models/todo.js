const mongoose = require("mongoose");

const todoSChema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isDelete: Boolean,
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model("todo", todoSChema);
