const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const jwt_token = req.cookies.JWT_token;

  if (jwt_token) {
    jwt.verify(jwt_token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        throw new Error(err);
      }
      next();
    });
  } else {
    throw new Error("user not found");
  }
};

module.exports = auth;
