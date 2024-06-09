const express = require("express");
const router = express.Router();
const multer = require("multer");
const transactionController = require("../../controller/transaction/transactionController");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname("file"));
  },
});
const upload = multer({ storage: storage });

router.post("/create", upload.single("img"), transactionController.create);

// Update Unit API
router.post("/update", transactionController.update);

// Delete Unit API
// router.delete("/:id/delete", transactionController.destroy);

// Get All Units API
router.get("/get", transactionController.getAll);

module.exports = router;
