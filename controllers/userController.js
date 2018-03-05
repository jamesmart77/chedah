const db = require("../models");
const plaid = require('plaid');
const gigController = require('./gigController');
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
    console.log("HITTING IT")
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
        //create personal gig as default because user was just created
        gigController.addPersonalGig({
            "name": "Personal"
          })
          //assoc new gig to user model
          .then((gigModel) => {
            return db.User.findOneAndUpdate({
              _id: dbModel._id
            }, {
              $push: {
                gigs: gigModel._id
              }
            }, {
              new: true
            });
          })
          .then((dbUser) => res.json(dbUser))
          .catch(err => {
            console.log('error')
            console.log(err)
            res.status(404).json({
              err: err
            });
          });
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

    console.log(data.user)

    //find default gig
    //add item to current user and include gig in item
    db.Gig
      .findOne({
        "default": true
      })
      .then((defaultGig) => {
        db.User
          .findOneAndUpdate({
            "auth_id": data.user.sub
          }, {
            $push: {
              "items": {
                "access_token": data.item.ACCESS_TOKEN,
                "item_id": data.item.ITEM_ID,
                "gigID": defaultGig._id
              }
            }
          }, {
            upsert: true
          })
          .then(dbUser => {
            res.json(dbUser);
          })
          .catch((err) => {
            console.log("error adding item to user");
            console.log(err);
            res.json(err);
          });
      })
      .catch((err) => {
        console.log("error finding default gig");
        console.log(err);
        res.json(err);
      })


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
        const startDate = '2017-01-01'; //moment().subtract(30, 'days').format('YYYY-MM-DD');
        const endDate = '2018-02-01'; //moment().format('YYYY-MM-DD');

        /*TODO
          - INCLUDE PROMISE ALL LOGIC TO LOOP THROUGH ALL LINKED ACCOUNTS IN USER PROFILE
        */
       
        //exchange item.access_token to return transactions
        client.getTransactions(dbUser.items[0].access_token, startDate, endDate, {
          count: 250,
          offset: 0,
        }, (error, transactionsResponse) => {
          //keep !=null since falsy will flag nulls
          if (error != null) {
            console.log("error in getting plaid transactions");
            console.log(error);
            res.json({
              error: error
            });
          }
          console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');

          var i = 0;

          while (i < transactionsResponse.transactions.length) {

            //if transaction is not pending
            if (!transactionsResponse.transactions[i].pending) {

              //create transaction object to insert into DB
              let transactionObj = {
                amount: transactionsResponse.transactions[i].amount,
                category: transactionsResponse.transactions[i].category !== null ? transactionsResponse.transactions[i].category[0] : 'Other',
                date: transactionsResponse.transactions[i].date,
                transactionName: transactionsResponse.transactions[i].name,
                transaction_id: transactionsResponse.transactions[i].transaction_id
              }

              //add transaction to transaction collection
              //if transactionID is already in collection, transaction will not be added
              db.Transaction
                .create(transactionObj)
                .then((dbTrans) => {
                  //add new transactionID to user.items.transactions array
                  db.User
                    .update(
                      {"auth_id": req.body.sub, "items.item_id": dbUser.items[0].item_id},
                      //addToSet pushes to array if item does not already exist
                      { "$addToSet": {"items.$.transactions": dbTrans._id}}
                    )
                    .catch((err) => console.log(err))
                })
                .catch((err) => {
                  console.log("transaction insert failed");
                  console.log(err);
                  console.log("\nTransaction object");
                  console.log(transactionObj);
                })

              }

            //iterate through all transactions in while loop 
            i++
          }
          res.json({msg: "transactions loaded successfully"});
        });
      })
      .catch((err) => console.log(err))
  }
};
