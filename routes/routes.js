// 分流套件 Router()
const express = require("express")
const router = express.Router()

// Controllers
const productController = require("../controllers/productController.js")
const cartController = require("../controllers/cartController.js")

// -------------------- Selling Products ---------------------

// Homepage
router.get("/", (req, res) => {
  res.redirect("/products")
})

// [Read] Products listing pages
router.get("/products", productController.getProducts)

// [Read] Single product details
router.get("/products/:id", productController.getProduct)

// -------------------- Shopping Carts ---------------------
// [Read] 
router.get("/cart", cartController.getCart)

// [Create/POST] Add to Cart
router.post("/cart", cartController.postCart)

// CartItem
// [Create/POST] (1) Plus CartItems
router.post("/cartItem/:id/add", cartController.addCartItem)
// [Create/POST] (2) Minus CartItems
router.post('/cartItem/:id/sub', cartController.subCartItem)
// [Delete] (3) Delete CartItems
router.delete("/cartItem/:id", cartController.deleteCartItem)

module.exports = router