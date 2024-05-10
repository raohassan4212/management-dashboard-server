const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const Users = require("../../models/User/user");
const ProfileInfo = require("../../models/ProfileInfo/profileInfo");
const CommissionRate = require("../../models/CommissionRates/commissionRates");
const Salary = require("../../models/Salary/salary");
const Allowance = require("../../models/Allowance/allowance");

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
    has_allowance: reqData.has_allowance,
    blocked: reqData.blocked,
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
  if (reqData.has_commission) {
    await CommissionRate.create({
      rate: reqData.commission_rate,
      user_id: newUser.id,
    });
  }
  if (reqData.has_salary) {
    await Salary.create({
      amount: reqData.salary_amount,
      user_id: newUser.id,
    });
  }
  if (reqData.has_allowance) {
    await Allowance.create({
      allowance_type: reqData.allowance_type,
      amount: reqData.allowance_amount,
      user_id: newUser.id,
    });
  }

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
      blocked: false,
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
      id: user.id,
      name: user.name,
      email: user.email,
      designation: user.ProfileInfo.designation,
      role: user.role,
      blocked: user.blocked,
      has_commission: user.has_commission,
      has_allowance: user.has_allowance,
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
    const { name, email } = reqData;

    let whereClause = {};
    if (name) whereClause.name = { [Op.like]: `%${name}%` || "" };
    if (email) whereClause.email = { [Op.like]: `%${email}%` || "" };

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
        {
          model: Salary,
        },
        {
          model: CommissionRate,
        },
        {
          model: Allowance,
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
  let commission;
  let salary;
  let allowance;

  if (reqData) {
    const updatedUser = await Users.update(
      {
        id: reqData.id,
        name: reqData.name,
        email: reqData.email,
        password: reqData.password,
        has_commission: reqData.has_commission,
        has_salary: reqData.has_salary,
        has_allowance: reqData.has_allowance,
        blocked: reqData.blocked,
        role: reqData.role,
      },
      { where: { id: reqData.id } }
    );
    const updatedProfileInfo = await ProfileInfo.update(
      {
        id: reqData.profileInfoId,
        designation: reqData.designation,
        address: reqData.address,
        authorized: reqData.authorized,
        warning: reqData.warning,
        phone: reqData.phone,
        joined: reqData.joined,
      },
      { where: { user_id: reqData.id } }
    );
    if (reqData.has_commission === true) {
      commission = await CommissionRate.upsert(
        {
          id: reqData.commissionRateId,
          rate: reqData.commission_rate,
          user_id: reqData.id,
        },
        { where: { user_id: reqData.id } }
      );
    } else {
      if (reqData.commissionRateId) {
        CommissionRate.destroy({ where: { id: reqData.commissionRateId } });
      }
    }
    if (reqData.has_salary === true) {
      salary = await Salary.upsert(
        {
          id: reqData.salaryId,
          amount: reqData.salary_amount,
          user_id: reqData.id,
        },
        { where: { user_id: reqData.id } }
      );
    } else {
      if (reqData.salaryId) {
        Salary.destroy({ where: { id: reqData.salaryId } });
      }
    }
    if (reqData.has_allowance === true) {
      allowance = await Allowance.upsert(
        {
          id: reqData.allowanceId,
          amount: reqData.allowance_amount,
          allowance_type: reqData.allowance_type,
          user_id: reqData.id,
        },
        { where: { user_id: reqData.id } }
      );
    } else {
      if (reqData.allowanceId) {
        Allowance.destroy({ where: { id: reqData.allowanceId } });
      }
    }

    if (updatedUser && updatedProfileInfo) {
      return {
        code: 301,
        success: true,
        message: "user updated",
        data: {
          user: updatedUser,
          profileInfo: updatedProfileInfo,
          commission: commission,
          salary: salary,
          allowance: allowance,
        },
      };
    }
    if (!updatedUser || !updatedProfileInfo) {
      return {
        code: 301,
        success: false,
        message: "user not updated",
        data: {
          user: updatedUser,
          profileInfo: updatedProfileInfo,
          commission: commission,
          salary: salary,
        },
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
    const deletedUser = await Allowance.destroy({
      where: { user_id: reqData },
    });
    await ProfileInfo.destroy({ where: { user_id: reqData } });
    await CommissionRate.destroy({ where: { user_id: reqData } });
    await Salary.destroy({ where: { user_id: reqData } });
    await Users.destroy({ where: { id: reqData } });
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
