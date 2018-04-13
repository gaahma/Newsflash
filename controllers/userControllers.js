const db = require("../models");
const jwtDecode = require('jwt-decode');



module.exports = {
  userLoggedIn: function(req, res){
    let {id} = req.body;
    if(!id){
      res.sendStatus(422);
      return;
    }
    console.log(id)
    var auth0Id = jwtDecode(id).sub;
    db.User
      .findOneAndUpdate({auth0Id: auth0Id}, {$inc: {logins: 1}})
      .exec((err, user) => {
        if(!user){
          const settings = new db.Settings();
          const user = new db.User({auth0Id: auth0Id, settings: settings._id});
          settings.save();
          user.save().then(() => res.sendStatus(200));
        } else {
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

    var auth0Id = jwtDecode(id).sub;
    db.User
      .findOne({auth0Id: auth0Id})
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
    var auth0Id = jwtDecode(id).sub;
    db.User
      .findOneAndUpdate({auth0Id: auth0Id}, {$inc: {articlesRead: 1}})
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


