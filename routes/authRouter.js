const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signupController);
router.post("/login", authController.loginController);
router.post("/logout", authController.logoutController);
router.put("/update-user", authController.updateProfile);
router.delete("/delete/:username", authController.deleteUser);


module.exports = router;