const projectService = require("../../services/project/projectService");
const projectValidation = require("../../validation/project/projectValidation");
const errorLogger = require("../../functions/Logger");


const createProject = async (req, res) => {
  try {
    const validatedProject = await projectValidation.validate(req.body);
   
    const newProject = await projectService.createProject(validatedProject);

    return res.status(201).json({
      code: 201,
      success: true,
      message: "Project created successfully ",
      data: newProject,
    });
  } catch (error) {
    let statuscode = 500;
    let errorMessage = "Error creating project";

    // Handle specific errors and set appropriate status code/message
    errorLogger("POST", statuscode, error, "PROJECT", "1", errorMessage);

    return res.status(statuscode).json({
      code: statuscode,
      success: false,
      message: errorMessage,
    });
  }
};

const getProject = async (req, res) => {
  try{
    const { id } = req.query;
    if(id){
      const response = await projectService.getProject(id);
      return res.status(response.code).json({
        code: response.code,
        success: response.success,
        message: response.message,
        data: response.data,
      });
    }
    if(!id){
      const response = await projectService.getProject(null);
      return res.status(response.code).json({
        code: response.code,
        success: response.success,
        message: response.message,
        data: response.data,
      });
    }
  } catch (error) {
    let statuscode = 500;
    let errorMessage = "Error founding project";

  // Handle specific errors and set appropriate status code/message
  errorLogger("POST", statuscode, error, "PROJECT", "1", errorMessage);

  return res.status(statuscode).json({
    code: statuscode,
    success: false,
    message: errorMessage,
  });
}
};

const updateProject = async (req, res) => {
  try{
    let { id } = req.body;

    if (id == undefined || id == null){
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Required parameter is missing: id",
        error: "Mission Parameter",
      });
    }

    const response = await projectService.updateProject(req.body);
    if (!response) {
      return res.status(201).json({
        code: 404,
        success: false,
        message: "project not updated",
        data: null,
      });
    }
    return res.status(201).json({
      code: 201,
      success: true,
      message: "project updated successfully",
      data: response,
    });
} catch (error) {
  let statusCode = 500;
  let errorMessage = "Error updating project";

  // Handle specific errors and set appropriate status code/message
  errorLogger("UPDATE", statusCode, error, "PROJECT", "1", errorMessage);
  return res.status(statusCode).json({
    code: statusCode,
    success: false,
    message: errorMessage,
  });
 }
};

const deleteProject = async (req, res) => {
  try{
    const { id } = req.params;
    if(!id){
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Missing required parameter: id",
      });
    }
    // Validate user update data
    const deletedProject = await projectService.deleteProject(id);
    if (!deletedProject.success) {
      return res.status(200).json({
        code: 404,
        success: false,
        message: "Project not deleted",
      });
    }
    if (deletedProject.success) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Project deleted successfully",
        data: deletedProject,
      });
    }
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error deleting project";

    // Handle specific errors and set appropriate status code/message
    errorLogger("DELETE", statusCode, error, "PROJECT", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};
module.exports = { createProject, getProject, updateProject, deleteProject };