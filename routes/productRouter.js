const express = require('express');
const router = express.Router()
const productController = require("../controllers/productController")
const categoryController = require("../controllers/categoryController")
const auth = require("../middlewares/jwtAuthMiddleware");
const checkrole = require("../middlewares/checkrole")

//category routers
router.post("/addcategory", categoryController.addcat)
router.get("/fetchCategories", categoryController.fetchCategories)

//product routers


router.use(checkrole("user"));
router.get("/fetchProduct", productController.fetchProducts);

router.use(checkrole("admin"));
router.post("/addProduct", productController.addProduct);
router.delete("/deleteProduct/:id", productController.deleteProducts);
router.put("/updateProduct/:id", productController.updateProducts);

module.exports = router