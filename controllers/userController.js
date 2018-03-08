const db = require("../models");
const plaid = require('plaid');
const gigController = require('./gigController');
const util = require('util')
const axios = require('axios')
const R = require('ramda')
require('dotenv').config();

var client = new plaid.Client(
  process.env.PLAID_CLIENT_ID, // these values need to be updated and stored in a .env
  process.env.PLAID_SECRET, // these values need to be updated and stored in a .env
  process.env.PLAID_PUBLIC_KEY, // these values need to be updated and stored in a .env
  plaid.environments.sandbox
);

// Defining methods for the booksController
module.exports = {

  getUser: (req, res) => {
    console.log('getting the user')
    db.User.findOne({ auth_id: req.params.authId })
      .populate('accounts')
      .populate('transactions')
      .populate('gigs')
      .populate({
        path: 'gigs',
        populate: {
          path: 'goals',
          model: 'Goal'
        }
      })
      .then(dbUser => {

        // This breaks the pointer in memory and copies the object
        const user = JSON.parse(JSON.stringify(dbUser, null, 2))

        const isNegative = num => num < 0 ? true : false
        const isPositive = num => num > 0 ? true : false
        // const isPositive = R.complement(isNegative)
        const sum = (x, y) => Math.abs(x) + Math.abs(y)
        const sortObjects = (x, y) => x.total - y.total > 0 ? x : y


        user.accounts = user.accounts.map(account => {
          account.transactions = user.transactions.filter(t => t.account_id === account.account_id)
          return account
        })


        console.log('map over gigs')
        user.gigs = user.gigs.map(gig => {
          // filter for transactions associated with gig
          gig.transactions = user.transactions.filter(t => t.gigId === gig._id)

          // if the gig has transactions...
          if (gig.transactions.length) {
            // // Sum the money coming in
            gig.moneyIn = gig.transactions
              .map(t => t.amount)
              .filter(isNegative)
              .reduce(sum)
              .toFixed(2)

            // Sum the money going out
            gig.moneyOut = gig.transactions
              .map(t => t.amount)
              .filter(isPositive)
              .reduce(sum)
              .toFixed(2)

            // calculate net
            gig.net = gig.moneyIn - gig.moneyOut


            // Spending by vendor
            const transactionsByVendor = R.uniq(gig.transactions
              .map(t => t.transactionName))
              .map(vendor => gig.transactions.filter(t => t.transactionName === vendor))
              .map(tArray =>
                tArray.map(t => { return { name: t.transactionName, amount: t.amount } })
              )

            gig.vendors = R.uniq(transactionsByVendor.map(vendorTransArray => {
              return { name: vendorTransArray[0].name, total: R.sum(vendorTransArray.map(t => t.amount)).toFixed(2) }
            })).sort((a, b) => b.total - a.total)


            // Spending By Category
            const transactionsByCategory = R.uniq(gig.transactions
              .map(t => t.category))
              .map(category => gig.transactions.filter(t => t.category === category))
              .map(tArray =>
                tArray.map(t => { return { name: t.category, amount: t.amount } })
              )

            gig.spendingByCategory = R.uniq(transactionsByCategory.map(catTransArray => {
              return { name: catTransArray[0].name, total: R.sum(catTransArray.map(t => t.amount)).toFixed(2) }
            })).sort((a, b) => b.total - a.total)

          }
          return gig
        })

        //hardcoding some goals from the backend
        const goal = {}
        goal._id = '73829y4iu32h4jkh24242334'
        goal.name = 'Spend Less on Gas'
        goal.budget = 200.00
        goal.expenses = 150.00
        goal.percent = goal.expenses / goal.budget
        goal.net = goal.budget - goal.expenses
        goal.categories = ['Gas', 'Advertising']
        user.gigs[0].goals.push(goal)
        const goal2 = {}
        goal2._id = 'JDKSLFJKLJEKLEERNKJEWHE'
        goal2.name = 'Spend Less on Tolls'
        goal2.budget = 200.00
        goal2.expenses = 150.00
        goal2.percent = goal.expenses / goal.budget
        goal2.net = goal.budget - goal.expenses
        goal2.categories = ['Tolls', 'Fees']
        user.gigs[0].goals.push(goal2)

        user.categories = []
        const category

        // We pull the items out of the user object before returning to the client, because the access tokens are in it.
        const {items, transactions, ...userWithoutItems} = user
        require('fs').writeFileSync('./test.json', JSON.stringify(userWithoutItems,null,2))
        return userWithoutItems
      })
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ err: "didn't find it" }))
  },






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
        //create personal gig as default because user was just created
        gigController.createGig({
          "name": "Personal"
        })
          //assoc new gig to user model
          .then(gigModel => db.User.findOneAndUpdate({
            _id: dbModel._id
          }, {
              $push: {
                gigs: gigModel._id
              }
            }, {
              new: true
            })
          )
          .then(dbUser => {
            axios.post('https://sandbox.plaid.com/categories/get')
            .then(response => {
              response.data.
              return dbUser
            })
          })
          .then(dbUser => res.json(dbUser))
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
        // axios request here
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post('https://sandbox.plaid.com/accounts/get', {
          client_id: process.env.PLAID_CLIENT_ID,
          secret: process.env.PLAID_SECRET,
          access_token: data.item.ACCESS_TOKEN
        })
          .then(res => {
            const promises = res.data.accounts.map(account => {
              db.Gig.findOne({
                name: 'Personal'
              }).then(dbGig => {
                account.defaultGigId = dbGig._id
                db.Account.create(account)
                  .then(dbAccount => {
                    console.log('created account')
                    return db.User.findOneAndUpdate({
                      _id: dbUser._id
                    }, {
                        $push: {
                          accounts: dbAccount._id
                        }
                      }, {
                        new: true
                      })
                  })
                  .catch(console.log)
              })
            }).then(dbUser => {
              res.json(dbUser)
              console.log(res.data)
            })
              .catch((err) => {
                console.log("error adding item to user");
                console.log(err);
                res.json(err);
              });
          }).catch(console.log)

      })


    // res.json({userId});
  },

  // all gigs need to be associated with a user
  addGigToUser: (req, res) => {
    console.log(req.body)
    db.Gig.create({ 'name': req.body.name })
      .then(dbGig => {
        console.log(dbGig._id)
        return db.User
          .findOneAndUpdate({
            "auth_id": req.params.authId
          }, {
              $push: {
                gigs: dbGig._id
              }
            }, {
              new: true
            })
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => {
        console.log(err)
        res.status(500).json({ err: err })
      })
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

        axios.defaults.headers.post['Content-Type'] = 'application/json';
        const transactionPromises = dbUser.items.map(item => axios.post('https://sandbox.plaid.com/transactions/get', {
          client_id: process.env.PLAID_CLIENT_ID,
          secret: process.env.PLAID_SECRET,
          access_token: item.access_token,
          start_date: startDate,
          end_date: endDate,
          options: {
            count: 250,
            offset: 0
          }
        }))


        // console.log(transactionPromises)

        Promise.all(transactionPromises)
          .then(transactionsResponseArray => {
            const transactions = transactionsResponseArray
              .map(transactionResponses => transactionResponses.data.transactions)
              .reduce((acc, cv) => acc.concat(cv))
              .filter(transaction => !transaction.pending)

            console.log('pulled ' + transactions.length + ' transactions');

            db.Account.find()
              .then(dbAccounts => {
                var i = 0;
                while (i < transactions.length) {
                  const accountThatMatchesTransactionId = dbAccounts.find(account => transactions[i].account_id === account.account_id);
                  // console.log(transactions[i].account_id === dbAccounts.account_id)

                  //create transaction object to insert into DB
                  let transactionObj = {
                    amount: transactions[i].amount,
                    category: transactions[i].category !== null ? transactions[i].category[0] : 'Other',
                    date: transactions[i].date,
                    transactionName: transactions[i].name,
                    transaction_id: transactions[i].transaction_id,
                    account_id: transactions[i].account_id,
                    gigId: accountThatMatchesTransactionId.defaultGigId
                  }

                  //add transaction to transaction collection
                  //if transactionID is already in collection, transaction will not be added
                  db.Transaction
                    .create(transactionObj)
                    .then((dbTrans) => {
                      //add new transactionID to user.items.transactions array
                      db.User
                        .update(
                          { "auth_id": req.body.sub },
                          //addToSet pushes to array if item does not already exist
                          { "$addToSet": { "transactions": dbTrans._id } }
                        )
                        .catch((err) => console.log(err))
                    })
                    .catch((err) => {
                      // console.log("transaction insert failed");
                      // console.log(err);
                      // console.log("\nTransaction object");
                      // console.log(transactionObj);
                    })

                  //iterate through all transactions in while loop 
                  i++
                }
              })
              .catch(console.log)


            res.json({ msg: "transactions loaded successfully" });
          });


      })

      .catch(err => {
        console.log("error in getting plaid transactions");
        console.log(error);
        res.json({
          error: err
        })
      })


    // .catch((err) => console.log(err))
  }
};
