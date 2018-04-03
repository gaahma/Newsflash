const controller = require("../controllers").user;
const jwtCheck = require('./auth/jwtCheck');

module.exports = function(app){
  app.get("/getUser/:id", jwtCheck, controller.getUser);
  app.post("/userLoggedIn", jwtCheck, controller.userLoggedIn);
  app.put("/userReadArticle/:id", jwtCheck, controller.incReadCount);
}