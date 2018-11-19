const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
  title: String,
  year: String,
  director: String,
  duration: String,
  genre: Array,
  rate: String
});

mongoose.model('movies', MovieSchema);

