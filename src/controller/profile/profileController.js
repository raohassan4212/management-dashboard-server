const errorLogger = require("../../functions/Logger");

const ProfileService = require("../../services/profile/profileService");

const create = async (req, res) => {
  try {
    const response = await ProfileService.create(req.body);

    if (!response) {
      return res.status(201).json({
        code: 404,
        success: false,
        message: "Profile not created ",
        data: null,
      });
    }
    return res.status(201).json({
      code: 201,
      success: true,
      message: "Profile created successfully ",
      data: response,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error creating profile";

    // Handle specific errors and set appropriate status code/message
    errorLogger("UPDATE", statusCode, error, "PROFILE_INFO", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const update = async (req, res) => {
  try {
    let { user_id } = req.body;

    if (user_id == undefined || user_id == null) {
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Required parameter is missing: id",
        error: "Mission Parameter",
      });
    }

    const response = await ProfileService.update(req.body);

    if (!response) {
      return res.status(201).json({
        code: 404,
        success: false,
        message: "Profile not updated ",
        data: null,
      });
    }
    return res.status(201).json({
      code: 201,
      success: true,
      message: "Profile updated successfully ",
      data: response,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error updating profile";

    // Handle specific errors and set appropriate status code/message
    errorLogger("UPDATE", statusCode, error, "PROFILE_INFO", "1", errorMessage);
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
    const updatedUser = await UserServices.delete(id);

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Profile deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error deleting profile";

    // Handle specific errors and set appropriate status code/message
    errorLogger("DELETE", statusCode, error, "PROFILE_INFO", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};
module.exports = { update, paranoid, create };
