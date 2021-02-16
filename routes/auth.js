const express = require('express');
var router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.get('/login', function(req, res) {
    res.render('Login/login', {title: 'Login'});
  });
  
router.get('/register', function(req, res) {
    res.render('Login/register', {title: 'register'});
  });

router.post('/register', async function(req, res) {
  //Validate user input
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Check for duplicate users
  const emailExists = await User.findOne({email: req.body.email});
  if(emailExists) return res.status(400).send('Email already exists');

  //Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //New user created
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try{
    const savedUser = await user.save();
    res.send({user: user.id});
  }catch(err){
    res.status(400).send(err);
  }
});

router.post('/login', async function (req, res) {
  //Validate user input
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

    //Check if user exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is incorrect');

    //Check if password if correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //Create and assign JWT
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    res.send('logged in');
});

module.exports = router;