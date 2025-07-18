const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signUp", userController.signUp) //name, email, password are required
router.post("/login", userController.login) //email and password required
router.delete("/deleteUser", userController.deleteUser) //email

module.exports = router