var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Models = {};

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

mongoose.connect('mongodb://localhost/todos-mean');
mongoose.model('User', UserSchema);
mongoose.model('Todo', TodoSchema);

module.exports.User = mongoose.model('User');
module.exports.Todo = mongoose.model('Todo');
