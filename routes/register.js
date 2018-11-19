const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Models
require('../model/Login');
const Login = mongoose.model("login")

//Bcrypt
const bcrypt = require("bcrypt");
const bcryptSalt = 5;

//REGISTER
router.get('/', (req, res,) => {
  res.render('registerFile', {layout: "frontPage"});
});

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPassword = bcrypt.hashSync(password, salt);

  const register = Login({
    username: username,
    password: hashPassword,
    email: email
  })

  Login.find({
    $or: 
    [
      {
        username: username
      }, 
      {
        email: email
      }
    ]
  }) .then( result => {
    if(result.length === 0){
      let context = {
        sucessRegistration: true, 
        layout: "frontPage"
      };
      
      register.save(res.render("loginFile", {sucessRegistration: true, layout: "frontPage" }))
    } else if (username === "" || password === "" || email === ""){
      res.render("registerFile", {errorMessage: true, layout: "frontPage" })
    } else {
      res.render("registerFile", {userNameExists: true, layout: "frontPage" });
    }
  }).catch( err =>{
    throw err
  });
});

module.exports = router;