const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task_id: {
      type: String,
      required: true,
      trim: true,
      default: () => {
        return `TASK_${new mongoose.Types.ObjectId().toString()}`;
      },
    },
    user_id: { type: String, required: true, trim: true },
    task_name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    due_date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
