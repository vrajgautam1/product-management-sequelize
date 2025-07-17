const express = require('express');
const router = express.Router()
const productController = require("../controllers/productController")
const categoryController = require("../controllers/categoryController")

//category routers
router.post("/addcategory", categoryController.addcat)
router.get("/fetchCategories", categoryController.fetchCategories)

//product routers
router.post("/addProduct", productController.addProduct) 
router.get("/fetchProduct", productController.fetchProducts) //regular plus low stock products
router.delete("/deleteProduct/:id", productController.deleteProducts) 
router.put("/updateProduct/:id", productController.updateProducts) //regular, increase, decrease and partial updates

module.exports = router