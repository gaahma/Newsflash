const controller = require("../controllers").settings;
const jwtCheck = require('./auth/jwtCheck');

module.exports = function(app){
  app.put("/updateSettings/:id", jwtCheck, controller.updateSettings);
}

