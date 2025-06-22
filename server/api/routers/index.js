const express = require("express");
const router = express.Router();

const authRouter = require("./auth_router");
const taskRouter = require("./task_router");
const { verifyAuthToken } = require("../controllers/auth_ctrl");

router.use("/auth", authRouter);
router.use("/task", verifyAuthToken, taskRouter);

module.exports = router;
