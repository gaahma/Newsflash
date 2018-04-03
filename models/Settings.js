const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  punctuationPause: {
    type: Number,
    default: 1,
    min: 1 
  },
  endOfParagraphPause: {
    type: Number,
    default: 1,
    min: 1,
  },
  speed: {
    type: Number,
    default: 400,
    min: 50,
    max: 3000,
  },
  contentTypesEnabled: {
    type: Boolean,
    default: true
  },
  wordsPerFlash: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  }
})

const Settings = mongoose.model('Settings', SettingSchema);
module.exports = Settings;