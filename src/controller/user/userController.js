const cookie = require("cookie-parser");
const UserServices = require("../../services/user/userService");

const userValidation = require("../../validation/user/userValidation");
const errorLogger = require("../../functions/Logger");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Email or Password is missing: email or password",
        data: {},
      });
    }

    const response = await UserServices.login(req.body);
    if (response.code != 200) {
      return res.status(response.code).json({
        code: response.code,
        success: response.success,
        message: response.message,
        data: response.data,
      });
    }

    const option = {
      expiresIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    const token = response.data.token;

    return res.status(response.code).cookie("token", token, option).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error logging in user";

    // Handle specific errors and set appropriate status code/message
    errorLogger("POST", statusCode, error, "USER", "1", errorMessage);

    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const get = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const response = await UserServices.get(req.query);
      return res.status(response.code).json({
        code: response.code,
        success: response.success,
        message: response.message,
        data: response.data,
      });
    }
    if (!id) {
      const response = await UserServices.get(req.query);
      return res.status(response.code).json({
        code: response.code,
        success: response.success,
        message: response.message,
        data: response.data,
        pageSize: response.pageSize,
        totalCount: response.totalCount,
      });
    }
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error founding user";

    // Handle specific errors and set appropriate status code/message
    errorLogger("GET", statusCode, error, "USER", "1", errorMessage);

    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const signUp = async (req, res) => {
  try {
    let { email } = req.body;

    const validatedUser = await userValidation.validate(req.body);
    const existingUser = await UserServices.checkUser(email);

    if (existingUser) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "User Already Exist",
        data: existingUser,
      });
    }

    const response = await UserServices.signUp(validatedUser);

    return res.status(201).json({
      code: 201,
      success: true,
      message: "User created successfully ",
      data: response,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error creating user";

    // Handle specific errors and set appropriate status code/message
    errorLogger("POST", statusCode, error, "USER", "1", errorMessage);

    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const update = async (req, res) => {
  try {
    let { id } = req.body;

    if (id == undefined || id == null) {
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Required parameter is missing: id",
        error: "Mission Parameter",
      });
    }

    const response = await UserServices.update(req.body);
    if (!response) {
      return res.status(201).json({
        code: 404,
        success: false,
        message: "user not updated",
        data: null,
      });
    }
    return res.status(201).json({
      code: 201,
      success: true,
      message: "User updated successfully",
      data: response,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error updating user";

    // Handle specific errors and set appropriate status code/message
    errorLogger("UPDATE", statusCode, error, "USER", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const paranoid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Missing required parameter: id",
      });
    }

    // Validate user update data (using Joi or custom logic)
    const deletedUser = await UserServices.paranoid(id);
    if (!deletedUser.success) {
      return res.status(200).json({
        code: 404,
        success: false,
        message: "User not deleted",
      });
    }
    if (deletedUser.success) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    }
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error deleting user";

    // Handle specific errors and set appropriate status code/message
    errorLogger("DELETE", statusCode, error, "USER", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const verifyToken = (req, res) => {
  res.status(200).json({ status: "success", isAuthorized: true });
};

const verify = (req, res, next) => {
  const token = req.headers["x-access-token"]?.split("Split")[1];
  if (token) {
    //token recieved this condition executes
    jwt.verify(
      token,
      "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm",
      (err, decode) => {
        if (err) {
          return res.json({
            status: "error",
            isAuthorized: false,
            message: "error-occured",
          });
        }
        req.user = {};
        req.user.id = decode.id;
        next();
      }
    );
  } else {
    res.json({ status: "error", message: "token-not-verified" });
  }
};

module.exports = { login, signUp, update, paranoid, get, verify, verifyToken };
