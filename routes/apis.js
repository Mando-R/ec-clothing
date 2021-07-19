// 引入 Express 和 Express 路由器
const express = require("express")
const router = express.Router()

// Controllers
const productController = require("../controllers/api/productController.js")
const orderController = require("../controllers/api/orderController.js")

// JWT
const passport = require("../config/passport")
// JSON Web Token (JWT) Signin
const userController = require("../controllers/api/userController.js")

// passport.authenticate()：是 passport-jwt 提供的方法，此處依官方文件設定，但把方法封裝成 authenticated，準備當成 middleware 加入路由。
const authenticated = passport.authenticate("jwt", { session: false })

// 注意：
// 1. prefix 不須再加上 api/，例如：api/admin/data
// 2. 仍注意URL前面都有"/"，例如：/admin/data

// -------------------- Selling Products ---------------------

// [Read] Products listing pages
router.get("/products", productController.getProducts)

// [Read] Single product details
router.get("/products/:id", productController.getProduct)

// -------------------- Orders ---------------------
// [Read] Orders listing
router.get("/orders", authenticated, orderController.getOrders)

// -------------------- JWT ---------------------
// JSON Web Token (JWT) SignIn & SignUp
router.post("/signin", userController.signIn)

router.post("/signup", userController.signUp)

// 匯出 Route 模組
module.exports = router
