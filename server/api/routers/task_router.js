const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} = require("../controllers/task_ctrl");
const { body, query } = require("express-validator");
const router = express.Router();

router.post(
  "/create_task",
  [
    body("user_id").notEmpty().withMessage("User ID is required"),
    body("task_name").notEmpty().withMessage("Task Name should not be empty"),
    body("due_date")
      .notEmpty()
      .withMessage("Due date is required")
      .bail()
      .isISO8601()
      .withMessage("Enter a valid due date"),
  ],
  createTask
);
router.patch(
  "/update_task",
  [
    body("user_id").notEmpty().withMessage("User ID is required"),
    body("task_id").notEmpty().withMessage("Task ID is required"),
    body("task_name").notEmpty().withMessage("Task Name should not be empty"),
    body("due_date")
      .notEmpty()
      .withMessage("Due date is required")
      .bail()
      .isISO8601()
      .withMessage("Enter a valid due date"),
  ],
  updateTask
);
router.delete(
  "/delete_task",
  [body("task_id").notEmpty().withMessage("Task ID is required")],
  deleteTask
);
router.get(
  "/get_all_tasks",
  [query("user_id").notEmpty().withMessage("User ID is required")],
  getAllTasks
);

module.exports = router;
