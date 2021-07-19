const express = require("express")
const handlebars = require("express-handlebars")
// const db = require("./models")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
// express & port
const app = express()
const port = process.env.PORT || 3000
// cookie & session
const session = require("express-session")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")

// 引入 .env 檔案：若現在環境 process.env.NODE_ENV 非 "production"，則使用 dotenv 資訊。注意：順序在 Passport 之前。
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

// Handlebars
app.engine("hbs", handlebars({
  extname: ".hbs",
  defaultLayout: "main.hbs",
  // helpers: require("./config/handlebars-helpers.js")
}))
app.set("view engine", "hbs")

// 靜態 Bootstrap、popper.js、jquery
// 引入靜態 css 檔案：注意用 __dirname 絕對路徑
app.use(express.static(__dirname + "/public"))

// app.use
// (1) bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// (2) Session & Shopping Cart
app.use(cookieParser())

// (3) express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // Session & Shopping Cart
  cookie: { maxAge: 80000 },
  resave: false
}))

// (4) method-override
app.use(methodOverride("_method"))

// (5) connect-flash：放在 passport 後面，res.locals.user 才能傳給 Views。
app.use(flash())
// [app.js] res.locals -> [Controllers] req.flash -> [Views] Handlebars
app.use((req, res, next) => {
  // res.locals [view 專屬]：把變數放入 res.locals 內，讓所有 view 都能存取。
  // req.flash 放入 res.locals 內
  res.locals.success_messages = req.flash("success_messages")
  res.locals.error_messages = req.flash("error_messages")
  // res.locals.user = req.user
  // res.locals.user = helpers.getUser(req)  // 取代 req.user
  next()
})

// (6) multer(image)：設定靜態檔案路徑 /upload
// 加上 Route："/upload"，為靜態檔案，所以不像其他 Route 寫 Controller 邏輯，直接用 express.static 指定路徑即可。
app.use("/upload", express.static(__dirname + "/upload"))

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})

// 注意：require('./routes')(app) 須放在 app.js 最後一行，因按照由上而下順序，當 app.js 把 app(即 express()) 傳入 Route 時，程式中間(routes/index.js)做的 Handlebars 設定、Server 設定，也一併透過 app 變數傳入。
// 引入 routes 並傳入 app，讓 routes 可用 app 物件指定路由。
// require("./routes")(app, passport) // 把 passport 傳入 routes
// require("./routes")(app)
module.exports = app
