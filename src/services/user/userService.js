const Users = require("../../models/User/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (reqData) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(reqData.password, salt);
  let newUser = await Users.create({
    name: reqData.name,
    email: reqData.email,
    password: hash,
    role: reqData.role,
  });

  return newUser;
};

const checkUser = async (email) => {
  try {
    const existingUser = await Users.findOne({
      where: {
        email: email,
      },
    });
    return existingUser;
  } catch (error) {
    throw error;
  }
};

const login = async (reqData, res) => {
  const { email, password } = reqData;
  const jwtToken =
    "qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm";

  const user = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    return {
      code: 401,
      success: false,
      message: "user does not exist",
      data: {},
    };
  }

  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    return {
      code: 401,
      success: false,
      message: "password is wrong",
      data: {},
    };
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    jwtToken,
    {
      expiresIn: "2h",
    }
  );

  user.password = undefined;
  user.token = token;

  return {
    code: 200,
    success: true,
    message: "user login successfully",
    data: user,
  };
};

const get = async (reqData, res) => {
  if (reqData) {
    const userData = await Users.findOne({
      where: {
        id: reqData,
      },
    });

    if (userData) {
      return {
        code: 200,
        success: true,
        message: "user found",
        data: userData,
      };
    }
    if (!userData) {
      return {
        code: 301,
        success: false,
        message: "user not found",
        data: null,
      };
    }
  }
  if (!reqData) {
    const userData = await Users.findAll();
    if (userData) {
      return {
        code: 200,
        success: true,
        message: "all users found",
        data: userData,
      };
    }
    if (!userData) {
      return {
        code: 301,
        success: false,
        message: "users not found",
        data: null,
      };
    }
  }
};

const update = async (reqData, res) => {
  let parameter = "data";

  if (reqData) {
    const updatedData = await Users.upsert({ ...reqData });
    if (updatedData) {
      return {
        code: 301,
        success: true,
        message: "user updated",
        data: updatedData,
      };
    }
    if (!updatedData) {
      return {
        code: 301,
        success: false,
        message: "user not updated",
        data: updatedData,
      };
    }
  }
  if (!reqData) {
    return {
      code: 301,
      success: false,
      message: `${parameter} missing value`,
      data: null,
    };
  }
};

const paranoid = async (reqData, res) => {
  let parameter = "id";
  if (reqData) {
    const deletedUser = await Users.destroy({ where: { id: reqData } });
    if (deletedUser) {
      return {
        code: 200,
        success: true,
        message: "user deleted",
        data: deletedUser,
      };
    }
    if (!deletedUser) {
      return {
        code: 301,
        success: false,
        message: "user not deleted",
        data: null,
      };
    }
  }
  if (!reqData) {
    return {
      code: 301,
      success: false,
      message: `${parameter} missing value`,
      data: null,
    };
  }
};

module.exports = { signUp, checkUser, login, update, get, paranoid };
