const controller = require("../controllers").user;
const jwtCheck = require('./auth/jwtCheck');

module.exports = function(app){
  app.get("/getUser/:id", jwtCheck, controller.getUser);
}