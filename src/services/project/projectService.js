const Project = require("../../models/Project/project");

const createProject = async (projectData) => {
  try {
    const serial = Math.floor(100 + Math.random() * 9000);
    const newProject = await Project.create({
      ...projectData,
      serial: `PJ-${serial}`,
    });
    return newProject;
  } catch (error) {
    throw new Error("Failed to create project: " + error);
  }
};

const getAllProjects = async (reqData) => {
  try {
    const page = parseInt(reqData.page) || 0;
    const pageSize = parseInt(reqData.pageSize) || 10;

    const zeroBasedPage = Math.max(0, page - 1);
    const offset = zeroBasedPage * pageSize;

    const projects = await Project.findAll({ offset, limit: pageSize });
    return projects;
  } catch (error) {
    throw new Error("Failed to fetch projects: " + error.message);
  }
};

const getProjectById = async (projectId) => {
  try {
    const project = await Project.findOne({ where: { id: projectId } });
    return project;
  } catch (error) {
    throw new Error("Failed to fetch project: " + error.message);
  }
};

const updateProjectById = async (projectData) => {
  try {
    const project = await Project.findOne({ where: { id: projectData.id } });
    if (!project) {
      throw new Error("Project not found");
    }
    await project.update(projectData);
    return project;
  } catch (error) {
    throw new Error("Failed to update project: " + error.message);
  }
};

const deleteProjectById = async (projectId) => {
  try {
    const project = await Project.findOne({ where: { id: projectId } });
    if (!project) {
      throw new Error("Project not found");
    }
    await project.destroy();
    return project;
  } catch (error) {
    throw new Error("Failed to delete project: " + error.message);
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
