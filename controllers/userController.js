const db = require("../models");
const plaid = require('plaid');
require('dotenv').config();

var client = new plaid.Client(
  process.env.PLAID_CLIENT_ID, // these values need to be updated and stored in a .env
  process.env.PLAID_SECRET, // these values need to be updated and stored in a .env
  process.env.PLAID_PUBLIC_KEY, // these values need to be updated and stored in a .env
  plaid.environments.sandbox
);

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
        res.json({
          user: dbModel,
          userExist: true
        })
      })
      .catch(err => {
        console.log("error")
        console.log(err)
        err.code === 11000 ? res.json({
          userExist: true
        }) : res.status(404).json({
          err: err
        })
      });
  },

  addItemToUser: (data, res) => {


    // const userId = req.body.user.sub;

    //find user by id push Item into array and store the access_token

    // console.log(req.body);
    // console.log("userID: " + userId);

    console.log(data.user)

    db.User
      .findOneAndUpdate({
        "auth_id": data.user.sub
      }, {
        $push: {
          "items": {
            "access_token": data.item.ACCESS_TOKEN,
            "item_id": data.item.ITEM_ID
          }
        }
      }, {
        upsert: true
      })
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
      .findOne({
        "auth_id": req.body.sub
      })
      .then((dbUser) => {
        // console.log(dbUser)

        // Pull transactions for the Item for the last 30 days
        const startDate = '2017-01-01';//moment().subtract(30, 'days').format('YYYY-MM-DD');
        const endDate = '2018-02-01';//moment().format('YYYY-MM-DD');
        client.getTransactions(dbUser.items[0].access_token, startDate, endDate, {
          count: 250,
          offset: 0,
        }, function (error, transactionsResponse) {
          if (error != null) {
            console.log(JSON.stringify(error));
            return res.json({error: error});
          }
          console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
          res.json(transactionsResponse);
        });
      })
      .catch((err) => console.log(err))
  }
};
