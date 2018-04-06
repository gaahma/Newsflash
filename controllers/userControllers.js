const db = require("../models");
const jwtDecode = require('jwt-decode');



module.exports = {
  userLoggedIn: function(req, res){
    let {id} = req.body;
    if(!id){
      res.sendStatus(422);
      return;
    }
    var auth0Id = jwtDecode(id).aud;
    db.User
      .findOneAndUpdate({auth0Id: auth0Id}, {$inc: {logins: 1}})
      .exec((err, user) => {
        if(!user){
          db.User.create({auth0Id: id})
                 .then((user) => {
                   console.log(user);
                   db.Settings.create({_id: user.settings})
                   res.sendStatus(200)
                  });
        } else {
          console.log(user);
          res.sendStatus(200);
        }

      })
      .catch(err => res.status(422).json(err));
  },
  getUser: function(req, res){
    let {id} = req.params;
    if(!id){
      res.sendStatus(422);
      return;
    }

    var auth0Id = jwtDecode(id).aud;
    db.User
      .findOne({auth0Id: id})
      .populate("settings")
      .exec((err, user) => {
        console.log(err, user);
        if(user){
          res.json(user);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(err => res.status(422).json(err));
  },

  incReadCount: function(req, res){
    let {id} = req.params;
    if(!id){
      res.sendStatus(422);
      return;
    }
    var auth0Id = jwtDecode(id).aud;
    db.User
      .findOneAndUpdate({auth0Id: id}, {$inc: {articlesRead: 1}})
      .exec((err, user) => {
        if(!user){
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }

      })
      .catch(err => res.status(422).json(err));

  }
}


