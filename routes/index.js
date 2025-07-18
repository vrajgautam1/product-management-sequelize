const express = require("express");
const router = express.Router()
const productRouter = require("./productRouter")
const userRouter = require("./userRouter")
const auth = require("../middlewares/jwtAuthMiddleware")

router.use(userRouter)
router.use(auth)
router.use(productRouter)


module.exports = router 