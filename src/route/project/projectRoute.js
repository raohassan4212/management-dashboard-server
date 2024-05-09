const express = require("express");
const router = express.Router();
const projectController = require("../../controller/Project/projectController");

//create a new project
router.post("/projects", projectController.createProject);

//get all projects
router.get("/get", projectController.getProject);

//update a project
router.put("/update", projectController.updateProject);

//delete a project by ID
router.delete("/:id/delete", projectController.deleteProject);

module.exports = router;