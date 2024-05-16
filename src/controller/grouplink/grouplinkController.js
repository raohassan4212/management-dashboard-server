const GroupLinkService = require("../../services/attendence/attendenceService");
const GroupLinkValidation = require("../../validation/attendence/attendenceValidation");
const errorLogger = require("../../functions/Logger");

const create = async (req, res) => {
  try {
    const validatedGroupLink = await GroupLinkValidation.validate(req.body);
    const newGroupLink = await GroupLinkService.createGroupLink(
      validatedGroupLink
    );
    res.status(201).json({
      success: true,
      message: "GroupLink created successfully",
      data: newGroupLink,
    });
  } catch (error) {
    errorLogger(
      "POST",
      500,
      error,
      "GroupLink",
      "1",
      "Error creating GroupLink"
    );
    res.status(500).json({
      success: false,
      message: "Failed to create GroupLink",
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await GroupLinkService.getAllGroupLinks(req.query);
    return res.status(response.code).json({
      success: response.code,
      message: response.message,
      pageSize: response.pageSize,
      totalCount: response.totalCount,
      data: response,
    });
  } catch (error) {
    errorLogger(
      "GET",
      500,
      error,
      "GroupLink",
      "1",
      "Error retrieving GroupLinks"
    );
    res.status(500).json({
      success: false,
      message: "Failed to retrieve GroupLinks",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await GroupLinkService.updateGroupLink(req.body);

    res.status(200).json({
      success: response.success,
      message: response.message,
      data: response,
    });
  } catch (error) {
    errorLogger(
      "UPDATE",
      500,
      error,
      "GroupLink",
      "1",
      "Error updating GroupLink"
    );
    res.status(500).json({
      success: false,
      message: "Failed to update GroupLink",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGroupLink = await GroupLinkService.deleteGroupLink(id);

    res.status(200).json({
      success: true,
      message: "GroupLink deleted successfully",
      data: deletedGroupLink,
    });
  } catch (error) {
    errorLogger(
      "DELETE_GroupLink",
      500,
      error,
      "GroupLink",
      "1",
      "Error deleting GroupLink"
    );
    res.status(500).json({
      success: false,
      message: "Failed to delete GroupLink",
      error: error.message,
    });
    W;
  }
};

module.exports = {
  create,
  get,
  update,
  destroy,
};
