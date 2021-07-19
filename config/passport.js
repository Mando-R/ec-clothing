// 引入 .env
require("dotenv").config()

// passport 第三方登入套件
// 注意：req.user 取得 Passport 套件 包裝後的資料。
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
// Hash 雜湊
const bcrypt = require("bcryptjs")
// Models
const db = require("../models")
const { User, Product } = db

// ---------- 1. passport－LocalStrategy ----------
passport.use(new LocalStrategy({
  // Customize user field (設定客製化選項)
  usernameField: "email",
  passwordField: "password",
  // passReqToCallback: true - 對應下方 Authenticate user的第一個req，可以 callback 第一個參數內取得 req，就可呼叫 req.flash()放入客製訊息。
  passReqToCallback: true
},
  // 登入驗證程序：Authenticate user
  // cb：指 callback，對應官方文件的 done。寫成 cb，加強表達 callback 的意思，即驗證後執行的另一個 callback function。
  (req, username, password, cb) => {
    User.findOne({
      where: { email: username }
    })
      .then(user => {
        // 若在前面兩關 if() { return } 被擋下，則回傳 cb(null, false, ...)，只要在第二位帶入 false 代表登入失敗。
        // 1. 驗證失敗：找不到 user
        if (!user) {
          return cb(null, false, req.flash("error_messages", `帳號或密碼輸入錯誤`))
        }
        // 2. 驗證失敗：找到 user ，但 "Database 密碼"和"表單密碼"不一致。
        if (!bcrypt.compareSync(password, user.password)) {
          return cb(null, false, req.flash("error_messages", `帳號或密碼輸入錯誤！`))
        }
        // 3. 驗證成功：找到 user ，且"Database 密碼"和"表單密碼"一致。
        // 在 User.findOne().then() 段落，要成功走到最後一行，才會 return cb(null, user)，第一個 null 是 Passport 奇妙設計，不要管他，第二個參數如果傳到 user，代表成功登入，並且會回傳 user。
        return cb(null, user)
      })
  }
))

// ---------- Serialize & Deserialize：轉換資料過程，節省空間。 ----------
// 1. Serialize user：只存 user id，不存整個 user。
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

// 2. Deserialize user：透過 user id，取出整個 user 物件實例，放入 req.user。
passport.deserializeUser((id, cb) => {
  // 注意：從 User Model(Database) 取出 user Data。
  User.findByPk(id, {
    // 注意：passport.js 設定 passport.deserializeUser[Eager Loading] -> req.user：isLiked
    include: [
      // as：之後使用 "req.user"，一併取得 product 資料！
      { model: Product, as: "userFindProducts" },
    ]
  })
    .then(user => {
      user = user.toJSON()
      return cb(null, user)
    })
})

// --------------- 3. passport－JWT ---------------
const jwt = require("jsonwebtoken")
const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

// 1. jwtOptions：根據 jwtOptions 內資訊，可成功解開 token，之後運用裡面資訊查找 user。
let jwtOptions = {}

// 2. jwtOptions.jwtFromRequest：設定尋找 token 的位置，指定 authorization "header" 內的 Bearer 項目。
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

// 3. jwtOptions.secretOrKey：使用"密鑰"檢查 token 是否經纂改，即放入 process.env.JWT_SECRET 的字串，此密鑰只有 Server 知道。
jwtOptions.secretOrKey = process.env.JWT_SECRET

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  User.findByPk(jwt_payload.id, {
    include: [
      { model: Product, as: "userFindProducts" }
    ]
  })
    .then(user => {
      if (!user) {
        return next(null, false)
      }
      return next(null, user)
    })
})

passport.use(strategy)

// ---------- 匯出 passport ----------
module.exports = passport
