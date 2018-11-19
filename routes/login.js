const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Models
require('../model/Login');
const Login = mongoose.model("login")
const bcrypt = require("bcrypt");

//Router get Login

router.get('/', function (req, res,) {
  res.render('loginFile', {layout: "frontPage"});
});

router.post('/', (req,res) => {
  const username= req.body.username;
  const password = req.body.password;
  
  Login.findOne(
    {
      username: username
    }
  ).then((result) => {
    if(!result){
      res.render('loginFile', {incorrectCombi: true, layout: "frontPage"})
    } else if(bcrypt.compareSync(password, result.password)) {
      req.session.currentUser = result;
      res.redirect("/find-movie");
    } else {
      res.render('loginFile', {incorrectCombi: true, layout: "frontPage"})
    }
  })
  .catch((err) => {
    console.log(err)
    throw err;
  }) 
});



module.exports = router;