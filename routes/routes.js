// 分流套件 Router()
const express = require("express")
const router = express.Router()

// Controllers
const productController = require("../controllers/productController.js")

// -------------------- 前台 ---------------------

// Homepage
router.get("/", (req, res) => {
  res.redirect("/products")
})

// [Read] Products listing pages
router.get("/products", productController.getProducts)

// [Read] Single product details
router.get("/products/:id", productController.getProduct)

module.exports = router