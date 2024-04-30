const Users = require("../../models/User/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (reqData) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(reqData.password, salt);
  let newUser = await Users.create({
    ...reqData,
    password: hash,
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
    process.env.TOKEN_SECRET,
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

module.exports = { signUp, checkUser, login };
