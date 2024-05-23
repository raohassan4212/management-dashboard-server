const jwt = require("jsonwebtoken");
require("dotenv").config();

const userService = require("../services/user/userService");

const auth = async (req, res) => {
  const token = req.headers["x-access-token"];

  if (token) {
    try {
      const user = await userService.verifyToken(token);

      req.user = user; // Attach the user information to the request

      return res.status(200).json({
        success: true,
        status: 200,
        message: "user verified",
      });
    } catch (err) {
      return res.json({
        success: false,
        status: 301,
        message: "Token is not valid",
        error: err,
      }); 
    }
  } else {
    throw new Error("user not found");
  }
};

module.exports = auth;
