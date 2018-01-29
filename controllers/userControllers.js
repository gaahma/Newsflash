const db = require("../models");

module.exports = {
  getUser: function(req, res){
    const {id} = req.params;
    if(!id){
      res.sendStatus(422);
      return;
    }
    db.User
      .findOne({auth0Id: id})
      .then(function(user){   
        if(!user){   //if user does not exist, create the user
          db.User
            .create({auth0Id: id})
            .then(newUser => res.status(200).json(newUser))
        } else {    //else return the user
          res.status(200).json(user);
        }
      })
      .catch(err => res.status(422).json(err));
  }
}