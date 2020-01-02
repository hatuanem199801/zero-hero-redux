const express = require("express");
const router = express.Router();
const Todo = require("../../models/todo");

router.get("/:page", async (req, res) => {
  try {
    console.log(req.params);
    const { page } = req.params;
    const totalItems = await Todo.find().countDocuments();
    const itemPerPage = 5;
    const totalPages = Math.ceil(totalItems / itemPerPage);
    let todos = await Todo.find()
      .limit(itemPerPage)
      .skip((page - 1) * itemPerPage)
      .sort({ date_created: -1 });
    return res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { text, description } = req.body;
    const todo = new Todo({
      text,
      description,
      isDelete: false
    });
    await todo.save();
    return res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.patch("/", async (req, res) => {
  try {
    const { _id } = req.body;
    let todo = await Todo.findById(_id);
    todo.isDelete = !todo.isDelete;
    await todo.save();
    return res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.delete("/", async (req, res) => {
  try {
    const { _id } = req.body;
    let todo = await Todo.findOneAndRemove(_id);
    await todo.remove();
    return res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
