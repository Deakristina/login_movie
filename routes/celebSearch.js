const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Model
require('../model/Celebrities');
const Celebrities = mongoose.model("celebrities");

router.get('/', (req, res) => {
  if(req.session.currentUser){
    res.render('findCeleb');
  } else {
    res.redirect('login');
  }
});

router.post('/', (req, res) => {
  Celebrities.find({
    $or: [
      {
        firstname: {'$regex': req.body.searchCeleb, $options: 'i'}
      },
      {
        lastname: {'$regex': req.body.searchCeleb, $options: 'i'}
      },
      {
        nationality: {'$regex': req.body.searchCeleb, $options: 'i'}
      },
    ]
  })
  .then((result) => {
    if(result.length === 0){
      console.log(result);
      res.render("findCeleb", {errorMessage: true})
    } else {
      res.render("findCeleb", {showCeleb: result})
    }
  }) 
  .catch((err) => {
    throw err;
  }); 
});


module.exports = router;