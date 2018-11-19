const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LoginSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

mongoose.model('login', LoginSchema);