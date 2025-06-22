const { validationResult } = require("express-validator");
const Task = require("../models/task_model");
const User = require("../models/user_model");

const createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.send({
      message: "Error occured!",
      success: false,
      data: errors.array(),
    });
  }

  const { user_id, task_name, due_date, description } = req.body;

  try {
    const existingUser = await User.findOne({ user_id });
    if (!existingUser) {
      return res.send({
        message: "Invalid User!!",
        success: false,
        data: null,
      });
    }

    const newTask = new Task({
      user_id,
      task_name,
      description,
      due_date,
    });
    await newTask.save();

    return res.send({
      message: "Task created successfully!!",
      success: true,
      data: { task_id: newTask.task_id },
    });
  } catch (error) {
    console.log(error);

    return res.send({
      message: "Error occured",
      success: false,
      data: null,
    });
  }
};

const updateTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.send({
      message: "Error occured!",
      success: false,
      data: errors.array(),
    });
  }

  const { user_id, task_id, task_name, due_date, description } = req.body;
  try {
    const existingTask = await Task.findOne({ user_id, task_id });
    if (!existingTask) {
      return res.send({
        message: "Invalid Task!!",
        success: false,
        data: null,
      });
    }

    existingTask.set({ task_name, due_date, description });
    await existingTask.save();

    return res.send({
      message: "Task updated successfully!",
      success: true,
      data: { task_id: existingTask.task_id },
    });
  } catch (error) {
    return res.send({
      message: "Error occured",
      success: false,
      data: null,
    });
  }
};

const deleteTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.send({
      message: "Error occured!",
      success: false,
      data: errors.array(),
    });
  }

  const { task_id } = req.body;
  try {
    const existingTask = await Task.findOne({ task_id });
    if (!existingTask) {
      return res.send({
        message: "Invalid Task!!",
        success: false,
        data: null,
      });
    }

    await existingTask.deleteOne();

    return res.send({
      message: "Task deleted successfully!",
      success: true,
      data: null,
    });
  } catch (error) {
    return res.send({
      message: "Error occured",
      success: false,
      data: null,
    });
  }
};

const getAllTasks = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.send({
      message: "Error occured!",
      success: false,
      data: errors.array(),
    });
  }

  const { user_id } = req.query;
  const page = parseInt(req.query.page) || 1,
    per_page = parseInt(req.query.per_page) || 10;

  try {
    const existingUser = await User.findOne({ user_id });
    if (!existingUser) {
      return res.send({
        message: "Invalid User!!",
        success: false,
        data: null,
      });
    }

    const tasks = await Task.find({ user_id })
      .skip((page - 1) * per_page)
      .limit(per_page);
    const totalTasks = await Task.countDocuments({ user_id });

    return res.send({
      message: "Task details!",
      success: true,
      data: { tasks, total: totalTasks },
    });
  } catch (error) {
    return res.send({
      message: "Error occured",
      success: false,
      data: null,
    });
  }
};

module.exports = { createTask, updateTask, deleteTask, getAllTasks };
