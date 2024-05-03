const Project = require("../../models/Project/project");


const createProject = async (projectData) => {
  try {
    const newProject = await Project.create(projectData);
    return newProject;
  } catch (error) {
    throw new Error("Failed to create project: " + error.message);
  }
};


const getAllProjects = async () => {
  try {
    const projects = await Project.findAll();
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


const updateProjectById = async (projectId, projectData) => {
  try {
    const project = await Project.findOne({ where: { id: projectId } });
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


module.exports = { createProject, getAllProjects, getProjectById, updateProjectById, deleteProjectById };
