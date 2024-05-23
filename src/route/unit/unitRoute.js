const express = require("express");
const router = express.Router();
const UnitController = require("../../controller/Unit/unitController");

// Create Unit API
router.post("/create", UnitController.create);

// Update Unit API
router.post("/update", UnitController.update);

// Delete Unit API
router.delete("/:id/delete", UnitController.destroy);

// Get All Units API
router.get("/get", UnitController.get);

module.exports = router;
