const express = require("express");
const router = express.Router();
const projectController = require("../../controller/Project/projectController");

//create a new project
router.post("/projects", projectController.createProject);

//get all projects
router.get("/projects", projectController.getAllProjects);

//get a project by ID
router.get("/projects/:projectId", projectController.getProjectById);

//update a project by ID
router.put("/projects/update", projectController.updateProjectById);

//delete a project by ID
router.delete("/projects/delete", projectController.deleteProjectById);

module.exports = router;
