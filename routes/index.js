// routes/index.js：Main router to bypass to [routes.js] & [apis.js].

// Bypass to [routes/routes.js]
const routes = require("./routes")

// Bypass to [routes/apis.js]
const apis = require("./apis")

module.exports = (app) => {
  // 透過 app.use，將 "/"(首頁 URL)，連至檔案 routes/routes.js [承上 const routes = require("./routes")]
  app.use("/", routes)
  //app.use("/api", apis)
}