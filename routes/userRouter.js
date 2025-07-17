const express = require("express");
const router = express.router();
const userController = require("../controllers/userController")

router.post("/signUp", userController.signUp)

module.exports = router