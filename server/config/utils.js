const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_TOKEN_SECRET } = require("./var");

const generateJWTtoken = (user) => {
  return jwt.sign({ id: user?._id }, JWT_SECRET, { expiresIn: "1h" });
};

const generateJWTRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { generateJWTtoken, generateJWTRefreshToken };
