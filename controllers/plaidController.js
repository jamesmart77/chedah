require('dotenv').config();
const axios = require('axios');
const db = require("../models");
const plaid = require('plaid');
const userController = require('./userController');


/* This should probably be globally availbale to our controller */
var client = new plaid.Client(
  process.env.PLAID_CLIENT_ID, // these values need to be updated and stored in a .env
  process.env.PLAID_SECRET, // these values need to be updated and stored in a .env
  process.env.PLAID_PUBLIC_KEY, // these values need to be updated and stored in a .env
  plaid.environments.sandbox
);

// Defining methods for the plaidController
module.exports = {

  // this is where our app will get it's private access key that we persist to our db, probably need an "app model?"
  getPrivateKey: function (req, res) {

    const PUBLIC_TOKEN = req.body.plaidObj.token;

    console.log("PUBLIC_TOKEN:" + PUBLIC_TOKEN)
    client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
      if (error != null) {
        var msg = 'Could not exchange public_token!';
        console.log(msg + '\n' + error);

        return res.json({
          error: msg
        });
      }

      // console.log("USER INFO IN PLAID CONTROLLER")
      // console.log(req.body)
      const item = {
        ACCESS_TOKEN : tokenResponse.access_token,
        ITEM_ID : tokenResponse.item_id
      }

      // console.log('Access Token: ' + item.ACCESS_TOKEN);
      // console.log('Item ID: ' + item.ITEM_ID);

      //pass the user, item and res to addItemToUser controller
      userController.addItemToUser({user: req.body.user, item: item}, res);
      
    });
  },

  // this is where we get items (accounts)
  getItem: function (req, res) {
    /* This is boilerplate from the API */
    // Pull information about the Item
    client.getItem(ACCESS_TOKEN, (err, result) => {
      // Handle err
      // The Item has a list of available products, billed products, error status,
      // webhook information, and more.
      const item = result.item;
    });
  },

  // this is where we get transactions
  getTransactions: function (req, res) {
    console.log("Getting Transactions");
    /* This is boilerplate from the API */

    // Retrieve transactions from Jan 1 until Feb 15
    // NOTE: This endpoint may return a `PRODUCT_NOT_READY` error if transactions
    // are not yet processed for the Item.




    // Dates will need to be read from req.body
    // hard coding them in here for now.
    req.body.startDate = '2015-01-01';
    req.body.endDate = '2017-02-15';
    const {startDate, endDate} = req.body;

        // We need to get the users access token for the item they are looking for transactions for
    // It's hardcoded in hardcoded in for now
    let accessToken = 'access-sandbox-2d37f621-c372-42d3-8403-78af978f9b70';

    client.getTransactions(accessToken, startDate, endDate, {
      count: 250,
      offset: 0,
    }, (err, result) => {
      if(err) console.log(err);
      const transactions = result.transactions;
      res.json(transactions);
      // return transactions;
    });


  },

   // this is where we get transactions
   getTransactionsByAccount: function (req, res) {
    console.log("Getting Transactions By Account");
    console.log(req.body);
    /* This is boilerplate from the API */

    // Retrieve transactions from Jan 1 until Feb 15
    // NOTE: This endpoint may return a `PRODUCT_NOT_READY` error if transactions
    // are not yet processed for the Item.

    


    // Dates will need to be read from req.body
    // hard coding them in here for now.
    req.body.startDate = '2015-01-01';
    req.body.endDate = '2017-02-15';
    const {startDate, endDate, accountId} = req.body;

    // We need to get the users access token for the item they are looking for transactions for
    // It's hardcoded in hardcoded in for now
    let accessToken = 'access-sandbox-2d37f621-c372-42d3-8403-78af978f9b70';

    client.getTransactions(accessToken, startDate, endDate, {
      count: 250,
      offset: 0,
    }, (err, result) => {
      if(err) console.log(err);
      const transactions = result.transactions.filter(t => t.account_id === accountId);

      res.json(transactions);
      // return transactions;
    });


  }
};