// 分流套件 Router()
const express = require("express")
const router = express.Router()

// Controllers
const productController = require("../controllers/productController.js")

// -------------------- 前台 ---------------------

// 1. Homepage 前台：restController ＋ authenticated
router.get("/", (req, res) => {
  res.redirect("/products")
})

// [Read]瀏覽 全部 商品
router.get("/products", productController.getProducts)
// router.get("/products", productController.getProducts)

module.exports = router