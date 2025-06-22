const express = require("express");
const {
  registerUser,
  loginUser,
  refreshToken,
} = require("../controllers/auth_ctrl");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Enter valid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  registerUser
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter valid Email"),
    body("password").notEmpty().withMessage("Enter the password"),
  ],
  loginUser
);
router.post("/refresh_token", refreshToken);

module.exports = router;
