const controller = require("../controllers").npr;
const jwtCheck = require('./auth/jwtCheck');

module.exports = function(app){
  app.get("/frontPage", jwtCheck, controller.frontPage);
  app.get("/:category/:name", jwtCheck, controller.categoryPage);
}