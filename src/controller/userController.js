const UserServices = require("../services/User/user");
const cookie = require("cookie-parser");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Email or Password is missing",
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
    return res.status(400).json({
      code: 400,
      success: false,
      message: "Failed",
      error: error,
    });
  }
};

const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (
      name == undefined ||
      name == "" ||
      email == undefined ||
      email == "" ||
      password == undefined ||
      password == ""
    ) {
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Required parameter is missing",
        error: "Mission Parameter",
      });
    }

    const existingUser = await UserServices.checkUser(email);

    if (existingUser) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "User Already Exist",
        data: existingUser,
      });
    }

    const response = await UserServices.signUp(req.body);

    return res.status(201).json({
      code: 201,
      success: true,
      message: "User created successfully ",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "error",
      error: error,
    });
  }
};

module.exports = { login, signUp };
