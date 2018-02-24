const db = require("../models");
const axios = require("axios");
require('dotenv').config();

// Defining methods for the booksController
module.exports = {
  
  createUserIfDoesNotExist: (req, res) => {
    const user = {
      firstName: req.body.given_name || null,
      lastName: req.body.family_name || null,
      auth_id: req.body.sub,
      email: req.body.email
    }
    db.User
      .create(user)
      .then(dbModel => {
        console.log(dbModel);
        return dbModel;
      })
      .then(dbModel => {
        res.json({user: dbModel, userExist: true})
      })
      .catch(err => {
        console.log("error")
        console.log(err)
        err.code === 11000 ? res.json({userExist: true}) : res.status(404).json({err: err})
      });
  },

  addItemToUser: (req, res) => {
    const userId = req.body.user.sub;

    //find user by id push Item into array and store the access_token

    // console.log(req.body);
    // console.log("userID: " + userId);

    db.User
      .findOneAndUpdate(
        {"auth_id" : userId},
        {
          $push: { 
            "items": {
              "access_token": req.body.plaidObj.token,
              "item_id": req.body.plaidObj.metadata.institution.institution_id
            }
          }},
          {upsert: true}
      )
      .then(dbUser => {
        console.log(dbUser)
        res.json(dbUser)
      })
      .catch((err) => {
        console.log(err)
        res.json(err)
      });

    // res.json({userId});
  },

  getTransactions: (req, res) => {

    db.User
      .findOne(
        {"auth_id" : req.body.sub}
      )
      .then((dbUser) => {
        console.log(dbUser)

        const userObj = {
          access_token: dbUser.items[0].access_token,
          client_id: process.env.PLAID_CLIENT_ID,
          secret: process.env.PLAID_SECRET,
          start_date: "2017-01-01",
          end_date: "2018-01-31"
        }

        axios.post("https//sandbox.plaid.com/transactions/get", userObj)
        .then((transResonse) => console.log(transResponse))
        .catch((err) => console.log(err));

        //query plaid for trans
        //return trans to frontend
      })
      .catch((err) => console.log(err))
  }
};
