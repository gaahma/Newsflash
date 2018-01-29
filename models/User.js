const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  auth0Id: {
    type: String,
    required: [true, "Auth0 login required"],
    unique: [true, "ID already exists"],
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
  savedArticles: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Articles"
  }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
