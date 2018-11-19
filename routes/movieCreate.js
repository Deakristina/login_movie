const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Models
require('../model/Movie');
const Movie = mongoose.model("movies");

router.get('/', (req, res) => {
    if (req.session.currentUser) {
      res.render("addMovie")
    } else {
      res.redirect('login');
    }
});

router.post('/', (req, res) => {
  let movie = new Movie(req.body);
  Movie.find({
    $and: 
    [
      {
        title: req.body.title
      }, 
      {
        director: req.body.director
      },
      {
        year: req.body.year
      }
    ]
  }) .then( result => {
    if(result.length === 0){
      movie.save(res.render("addMovie", {successAlert: true}))
    } else if(req.body.title === "" || req.body.director === "" || req.body.year === ""){
      res.render("addMovie", {errorMessage: true});
    }
     else {
      res.render("addMovie", {movieExists: true});
    }
  }).catch( err =>{
    throw err
  });
});


module.exports = router;