const express = require("express");
const router = express.Router();

//*saleController Import */
const serviceController = require("../../controller/service/serviceController");

//*Sale Create Api */
router.post("/create", saleController.create);
//*Sale Update Api */
router.post("/update", saleController.update);
//*Sale Delete Api */
router.delete("/delete", saleController.paranoid);
//*Sale Get All Api */
router.get("/get", saleController.getAll);
//*Sale Get By Id Api */
router.get("/get-id", saleController.getById);

module.exports = router;
