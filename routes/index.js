const express = require("express");
const router = express.Router()
const productRouter = require("./productRouter")
const userRouter = require("./userRouter")

router.use(productRouter)
router.use(userRouter)


module.exports = router 