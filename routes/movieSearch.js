const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Models
require('../model/Movie');
const Movie = mongoose.model("movies");


// Router Get Search Movies
router.get('/', (req, res) => {
  if(req.session.currentUser){
    res.render("findMovie")
  } else {
    res.redirect('login');
  }
});

router.post("/", (req, res) => {
  Movie.find({
    $or: [
      {title: 
        {'$regex': req.body.searchMovie, $options:'i'}
      },
      {director: 
        {'$regex':req.body.searchMovie, $options:'i'}
      },
      {year: 
        {'$regex':req.body.searchMovie, $options:'i'}
      }
    ]})
  .then((result) => {
    if(result.length === 0){
      res.render("findMovie", {erroMessage: true })
    } else {
      res.render("findMovie", {showMovies: result})
    } 
  })
  .catch((err) => {
    throw err;
  });
});

module.exports = router;