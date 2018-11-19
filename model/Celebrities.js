const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CelebSchema = new mongoose.Schema({
  firstname : String,
  lastname: String,
  nationality: String
});

mongoose.model('celebrities', CelebSchema);