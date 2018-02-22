const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  punctuationPause: {
    type: Number,
    default: 2
  },
  newParagraphPause: {
    type: Number,
    default: 2
  }
})

const Settings = mongoose.model('Settings', SettingSchema);
module.exports = Settings;