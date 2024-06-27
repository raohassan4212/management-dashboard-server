const express = require("express");
const router = express.Router();

//*saleController Import */
const saleController = require("../../controller/sale/saleController");

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
//*Sale Get By Filter Api */
router.get("/get-by-filter", saleController.getByFilter);

module.exports = router;
