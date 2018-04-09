const mongoose = require('mongoose');
const settings = require("./Settings");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  auth0Id: {
    type: String,
    required: [true, "Auth0 login required"],
    unique: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  articlesRead: {
    type: Number,
    default: 0
  },
  readingSpeed: {
    type: Number,
    required: false
  },
  logins: {
    type: Number,
    default: 1,
  },
  settings: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Settings",
  },
  savedArticles: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Articles"
  }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
