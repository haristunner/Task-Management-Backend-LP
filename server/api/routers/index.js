const express = require("express");
const router = express.Router();

const authRouter = require("./auth_router");
const taskRouter = require("./task_router");

router.use("/auth", authRouter);
router.use("/task", taskRouter);

module.exports = router;
