const db = require('../models');

module.exports = {
  updateSettings: function(req, res){
    const {id} = req.params;
    if(!id){
      res.sendStatus(422);
      return;
    }

    console.log(id);
    const {settings} = req.body;

    db.Settings.findByIdAndUpdate(id, settings, (err, doc) => {
      console.log(err, doc);
    })
    res.sendStatus(200);

  }
}