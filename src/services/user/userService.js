const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const Users = require("../../models/User/user");
const ProfileInfo = require("../../models/ProfileInfo/profileInfo");

const signUp = async (reqData) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(reqData.password, salt);
  let newUser = await Users.create({
    name: reqData.name,
    email: reqData.email,
    password: hash,
    role: reqData.role,
    has_commission: reqData.has_commission,
    has_salary: reqData.has_salary,
  });

  await ProfileInfo.create({
    phone: reqData.phone,
    address: reqData.address,
    designation: reqData.designation,
    joined: reqData.joined,
    authorized: reqData.authorized,
    warning: reqData.warning,
    user_id: newUser.id,
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
    include: [{ model: ProfileInfo }],
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
      name: user.name,
      email: user.email,
      designation: user.ProfileInfo.designation,
      role: user.role,
      has_commission: user.has_commission,
      has_salary: user.has_salary,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
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
  if (reqData.id) {
    const userData = await Users.findOne({
      where: {
        id: reqData.id,
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
  if (reqData.pageSize || reqData.page) {
    const { role, name, email } = reqData;

    let whereClause = {};
    if (name) whereClause.name = { [Op.like]: `%${name }%`|| "" };
    if (email) whereClause.email = { [Op.like]: `%${email }%`|| "" };

    // Combine remaining filters using spread syntax (assuming they are all applicable):

    const page = parseInt(reqData.page) || 0;
    const pageSize = parseInt(reqData.pageSize) || 10;

    const zeroBasedPage = Math.max(0, page - 1);
    const offset = zeroBasedPage * pageSize;

    let totalCount;
    let users;
    totalCount = await Users.count({ where: whereClause });
    users = await Users.findAll({
      where: whereClause,
      include: [
        {
          model: ProfileInfo,
        },
      ],
      offset,
      limit: pageSize,
    });
    if (users) {
      return {
        code: 200,
        success: true,
        message: "all users found",
        data: users,
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
        totalCount,
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
