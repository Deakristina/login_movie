const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Models
require('../model/Celebrities');
const Celebrities = mongoose.model("celebrities");

router.get('/', (req, res) => {
  if(req.session.currentUser){
    res.render('addCeleb');
  } else {
    res.redirect('/login');
  }
});

router.post('/', (req, res) => {
  let celeb = new Celebrities(req.body);
  Celebrities.find({
    $and: 
    [
      {
        firstname: req.body.firstname
      }, 
      {
        lastname: req.body.lastname
      }
    ]
  }) .then( result => {
    if(result.length === 0){
      celeb.save(res.render("addCeleb", {successAlert: true}))
    } else if(req.body.firstname === "" || req.body.lastname === "" || req.body.nationality === ""){
      res.render("addCeleb", {errorMessage: true});
    } else {
      res.render("addCeleb", {celebExists: true});
    }
  }).catch( err =>{
    throw err
  });
});


module.exports = router;