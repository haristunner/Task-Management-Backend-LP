const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} = require("../controllers/task_ctrl");
const router = express.Router();

router.post("/create_task", createTask);
router.patch("/update_task", updateTask);
router.delete("/delete_task", deleteTask);
router.get("/get_all_tasks", getAllTasks);

module.exports = router;
