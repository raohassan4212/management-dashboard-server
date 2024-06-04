const express = require("express");
const router = express.Router();

//*ServiceController Import */
const serviceController = require("../../controller/service/serviceController");

//*Service Create Api */
router.post("/create", serviceController.create);
//*Service Update Api */
router.post("/update", serviceController.update);
//*Service Delete Api */
router.delete("/delete", serviceController.destroy);
//*Service Get All Api */
router.get("/get", serviceController.get);

module.exports = router;
