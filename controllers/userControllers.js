const db = require("../models");

module.exports = {
  userLoggedIn: function(req, res){
    const {id} = req.body;
    if(!id){
      res.sendStatus(422);
      return;
    }
    db.User
      .findOneAndUpdate({auth0Id: id}, {$inc: {logins: 1}})
      .then(function(user){
        if(!user){
          db.User
            .create({auth0Id: id})
            .then(newUser => res.sendStatus(200));
        } else {
          res.sendStatus(200);
        }   
      })
      .catch(err => res.status(422).json(err));

  },
  getUser: function(req, res){
    const {id} = req.params;
    if(!id){
      res.sendStatus(422);
      return;
    }
    db.User
      .findOne({auth0Id: id}, function(err, user){
        console.log(user);
        if(user){
          res.json(user);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(err => res.status(422).json(err));
  }
}


