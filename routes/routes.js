// 分流套件 Router()
const express = require("express")
const router = express.Router()

// Passport 套件
const passport = require("../config/passport")
const helpers = require("../_helpers")

// Controllers
const productController = require("../controllers/productController.js")
const cartController = require("../controllers/cartController.js")
const userController = require("../controllers/userController.js")
const orderController = require("../controllers/orderController.js")

// -------------------- isAdmin 權限驗證(User Model) ---------------------
// 1. isAdmin 前台：authenticated
const authenticated = (req, res, next) => {
  // (1) 若 User 登入，則 next()。
  // if (req.isAuthenticated()) {
  if (helpers.ensureAuthenticated(req)) {
    return next()
  }
  // (2) 若 User 未登入，則導回 Sign-in 頁。
  res.redirect("/signin")
}

// -------------------- Selling Products ---------------------

// Homepage
router.get("/", authenticated, (req, res) => {
  res.redirect("/products")
})

// [Read] Products listing pages
router.get("/products", authenticated, productController.getProducts)

// [Read] Single product details
router.get("/products/:id", authenticated, productController.getProduct)

// -------------------- Shopping Carts ---------------------
// [Read] 
router.get("/cart", authenticated, cartController.getCart)

// [Create/POST] Add to Cart
router.post("/cart", authenticated, cartController.postCart)

// CartItem
// [Create/POST] (1) Plus CartItems
router.post("/cartItem/:id/add", cartController.addCartItem)
// [Create/POST] (2) Minus CartItems
router.post('/cartItem/:id/sub', cartController.subCartItem)
// [Delete] (3) Delete CartItems
router.delete("/cartItem/:id", cartController.deleteCartItem)

// -------------------- Orders ---------------------
// (1) [Read] Orders page
router.get("/orders", authenticated, orderController.getOrders)
// (2) [Create/POST] Shopping carts -> Orders
router.post("/order", authenticated, orderController.postOrder)
// (3) [Delete] Cancel orders
router.post("/order/:id/cancel", authenticated, orderController.cancelOrder)

// -------------------- Payment Gateway ---------------------
// (1) [Read] Controller 傳送 交易參數 -> 藍新平台
router.get("/order/:id/payment", orderController.getPayment)

// (2) [Create/POST] 藍新平台 -> Controller 接收 付款完成資訊
router.post("/newebpay/callback", orderController.newebpayCallback)

// -------------------- Sign-in／Sign-up／Log-out ---------------------

// Sign-up [User 註冊流程]
router.get("/signup", userController.signUpPage)
router.post("/signup", userController.signUp)

// Sign-in [passport 驗證] & Log-out
router.get("/signin", userController.signInPage)

// 登入機制邏輯 func
router.post("/signin", passport.authenticate("local",
  { failureRedirect: "/signin", failureflash: true }), userController.signIn)

// Log-out
router.get("/logout", userController.logout)


module.exports = router