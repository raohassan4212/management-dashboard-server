const projectService = require("../../services/project/projectService");
const projectValidation = require("../../validation/project/projectValidation");
const errorLogger = require("../../functions/Logger");

const createProject = async (req, res) => {
  try {
    const projectData = req.body;
    // Validate project data before creating
    await projectValidation.createProjectSchema.validate(projectData, {
      abortEarly: false,
    });

    const newProject = await projectService.createProject(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    errorLogger(
      "CREATE_PROJECT",
      500,
      error,
      "PROJECT",
      "1",
      "Error creating project"
    );
    res.status(500).json({ error: error });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects(req.query);
    res.status(200).json({
      code: 200,
      success: true,
      message: "Get All Project Successfully",
      data: projects,
    });
  } catch (error) {
    errorLogger(
      "GET_ALL_PROJECTS",
      500,
      error,
      "PROJECT",
      "1",
      "Error retrieving projects"
    );
    res.status(500).json({ error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await projectService.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    errorLogger(
      "GET_PROJECT_BY_ID",
      500,
      error,
      "PROJECT",
      "1",
      "Error retrieving project"
    );
    res.status(500).json({ error: error.message });
  }
};

const updateProjectById = async (req, res) => {
  try {
    const projectData = req.body;

    const updatedProject = await projectService.updateProjectById(projectData);
    res.status(200).json(updatedProject);
  } catch (error) {
    errorLogger(
      "UPDATE_PROJECT_BY_ID",
      500,
      error,
      "PROJECT",
      "1",
      "Error updating project"
    );
    res.status(500).json({ error: error.message });
  }
};

const deleteProjectById = async (req, res) => {
  try {
    const { projectId } = req.query;
    const deletedProject = await projectService.deleteProjectById(projectId);
    res.status(200).json(deletedProject);
  } catch (error) {
    errorLogger(
      "DELETE_PROJECT_BY_ID",
      500,
      error,
      "PROJECT",
      "1",
      "Error deleting project"
    );
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
