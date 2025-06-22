const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, trim: true },
    taskName: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
