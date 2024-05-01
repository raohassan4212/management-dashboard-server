const express = require("express");
const router = express.Router();

//*ProfileController Import */
const profileController = require("../../controller/profile/profileController");

//*Profile Create Api */
router.post("/create", profileController.create);
//*Profile Update Api */
router.post("/update", profileController.update);
//*Profile Delete Api */
router.delete("/:id/delete", profileController.paranoid);

module.exports = router;
