const db = require("../models");
const jwt = require("jsonwebtoken");
require('dotenv').config();
var secret = {};
secret.tokenSecret = process.env.tokenSecret;

//authenticatin middleware
const jwtauth = require('./jwtAuth.js');

// Defining methods for the booksController
module.exports = {
  login: (req, res) => {
    // db.User
    //   .findById(req.params.id)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
    console.log("IN THE AUTH CONTROLLER LOGIN")
    const user = {
      email: req.body.email
    }

    const token = jwt.sign(
      user, secret.tokenSecret);

    //store the JWT in the client's browser
    res.cookie('jwttoken', token);

    res.json({
      token: token
    });
  },
  isLoggedIn: (req, jwtauth, res) => {
  }
};