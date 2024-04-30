const express = require("express");
const router = express.Router();

//*UserController Import */
const userController = require("../../controller/user/userController");

//*User Signup Api */
router.post("/signup", userController.signUp);
//*User Login Api */
router.get("/login", userController.login);
//*User Get Api */
router.get("/get", userController.get);
//*User Update Api */
router.post("/update", userController.update);
//*User Delete Api */
router.delete("/:id/delete", userController.paranoid);

module.exports = router;
