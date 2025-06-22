const User = require("../models/user_model");
const {
  generateJWTtoken,
  generateJWTRefreshToken,
} = require("../../config/utils");

const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { JWT_REFRESH_TOKEN_SECRET } = require("../../config/var");

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.send({
      message: "Error occured!",
      success: false,
      data: errors.array(),
    });
  }

  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.send({
        message: "User already exists, please login to continue!!",
        success: false,
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    console.log(hashedPassword);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    console.log(newUser);

    return res.send({
      message: "User created successfully",
      success: true,
      data: { user_id: newUser.user_id },
    });
  } catch (error) {
    return res.send({
      message: "Error occured",
      success: false,
      data: null,
    });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.send({
      message: "Error occured!",
      success: false,
      data: errors.array(),
    });
  }
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.send({
        message: "Not an existing user, please register to use",
        success: false,
        data: null,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return res.send({
        message: "Invalid password!!",
        success: false,
        data: null,
      });
    }

    const jwt_access_token = generateJWTtoken(existingUser);
    const jwt_refresh_token = generateJWTRefreshToken(existingUser);

    return res.cookie("refreshToken", jwt_refresh_token).send({
      message: "User validated successfully!",
      success: true,
      data: {
        user_id: existingUser.user_id,
        access_token: jwt_access_token,
      },
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

const verifyAuthToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).send({
        message: `Authentication failure!`,
        success: false,
        data: null,
        error_msg: error?.message,
      });
    }

    const bearerToken = token.split(" ")[1];
    const verified = jwt.verify(bearerToken, JWT_SECRET);

    if (verified) {
      next();
    } else {
      return res.status(401).send({
        message: `Authentication failure!`,
        success: false,
        data: null,
      });
    }
  } catch (error) {
    return res.status(401).send({
      message: `Authentication failure!`,
      success: false,
      data: null,
      error_msg: error?.message,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).send({
        message: `Refresh token: Authentication failure!`,
        success: false,
        data: null,
      });
    }

    //Verifying the refresh token
    jwt.verify(token, JWT_REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).send({
          message: `Refresh token: Authentication failure!`,
          success: false,
          data: null,
          error_msg: err?.message,
        });
      }

      const access_token = generateJWTtoken({ _id: user.id });

      return res.send({
        message: `Authentication details!`,
        success: true,
        data: { access_token: access_token },
      });
    });
  } catch (error) {
    return res.status(401).send({
      message: `Refresh token: Authentication failure!`,
      success: false,
      data: null,
      error_msg: error?.message,
    });
  }
};

module.exports = { registerUser, loginUser, verifyAuthToken, refreshToken };
