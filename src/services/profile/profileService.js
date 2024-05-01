const ProfileInfo = require("../../models/ProfileInfo/profileInfo");

const create = async (reqData, res) => {
  let parameter = "data";

  if (reqData) {
    const updatedData = await ProfileInfo.upsert({ ...reqData });
    if (updatedData) {
      return {
        code: 301,
        success: true,
        message: "profile created",
        data: updatedData,
      };
    }
    if (!updatedData) {
      return {
        code: 301,
        success: false,
        message: "profile not created",
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

const update = async (reqData, res) => {
  let parameter = "data";

  if (reqData) {
    const updatedData = await ProfileInfo.upsert({
      ...reqData
    });
    if (updatedData) {
      return {
        code: 301,
        success: true,
        message: "profile updated",
        data: updatedData,
      };
    }
    if (!updatedData) {
      return {
        code: 301,
        success: false,
        message: "profile not updated",
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
    const deletedProfile = await ProfileInfo.destroy({
      where: { id: reqData },
    });
    if (deletedProfile) {
      return {
        code: 200,
        success: true,
        message: "profile deleted",
        data: deletedProfile,
      };
    }
    if (!deletedProfile) {
      return {
        code: 301,
        success: false,
        message: "profile not deleted",
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

module.exports = { update, paranoid, create };
