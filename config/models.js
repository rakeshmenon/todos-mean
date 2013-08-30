var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Models = {};

module.exports = function () {
  var DB_URL = "";

  switch(mode) {
    case "production":
      DB_URL = 'mongodb://rakesh:rakesh@ds041208.mongolab.com:41208/todos-mean';
      break;

    default:
      DB_URL = 'mongodb://localhost/todos-mean';
      break;
  };

  // User Schema
  var UserSchema = new Schema({
    provider: String,
    uid: String,
    name: String,
    image: String,
    created: {type: Date, default: Date.now}
  });

  var TodoSchema = new Schema({
    uid: String,
    item: String,
    completed: Boolean,
    created: {type: Date, default: Date.now}
  });

  mongoose.connect(DB_URL);
  mongoose.model('User', UserSchema);
  mongoose.model('Todo', TodoSchema);

  return {
    User: mongoose.model('User'),
    Todo: mongoose.model('Todo')
  };
};
