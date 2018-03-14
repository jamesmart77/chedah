// import { CastError } from "mongoose";
const db = require("../models");
const plaid = require('plaid');
const gigController = require('./gigController');
const util = require('util')
const axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/json';
const R = require('ramda')
require('dotenv').config();
const request = require("request")
const { isNegative, isPositive, sum, sortObjects, spendingByCategoryGig, spendingByVendorGig, transactionsGig, summaryGig, getToday, getThreeYearsAgoFromToday } = require('../utils')

var client = new plaid.Client(
  process.env.PLAID_CLIENT_ID, // these values need to be updated and stored in a .env
  process.env.PLAID_SECRET, // these values need to be updated and stored in a .env
  process.env.PLAID_PUBLIC_KEY, // these values need to be updated and stored in a .env
  plaid.environments.sandbox
);

// Defining methods for the USER controller
module.exports = {

  getUser: (req, res) => {

    
    // If the user is in cache, send that shit.
    console.log('getting the user')
    
      .then(user => {

        if(user.accounts){          user.accounts = user.accounts.map(account => {
            account.transactions = user.transactions.filter(t => t.account_id === account.account_id)
            account.defaultGigName = user.gigs.find(gig => gig._id.toString() === account.defaultGigId.toString()).name
            return account
          })
        }

        console.log('testing 1')
        // console.log(user)

        console.log('map over gigs')
        user.gigs = user.gigs.map(gig => {
          // filter for transactions associated with gig
          gig.transactions = user.transactions.filter(t => t.gigId === gig._id.toString())
          
          // if the gig has transactions...
          if (gig.transactions.length) {
            // // Sum the money coming in
            console.log(`${gig.name} has ${gig.transactions.length} transactions`)

            gig.moneyInCache = gig.transactions
            .map(t => t.amount)
            .filter(isNegative)

            gig.moneyIn = gig.moneyInCache.length > 0 ? gig.moneyInCache.reduce(sum) : 0.0
            

            console.log(gig)

            
            // Sum the money going out
            gig.moneyOut = gig.transactions
              .map(t => t.amount)
              .filter(isPositive)
              .reduce(sum)

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
              return { name: vendorTransArray[0].name, total: R.sum(vendorTransArray.map(t => t.amount)) }
            })).sort((a, b) => b.total - a.total)


            // Spending By Category
            const transactionsByCategory = R.uniq(gig.transactions
              .map(t => t.category))
              .map(category => gig.transactions.filter(t => t.category === category))
              .map(tArray =>
                tArray.map(t => { return { name: t.category, amount: t.amount } })
              )

            gig.spendingByCategory = R.uniq(transactionsByCategory.map(catTransArray => {
              return { name: catTransArray[0].name, total: R.sum(catTransArray.map(t => t.amount)) }
            })).sort((a, b) => b.total - a.total)

          }
          console.log(gig.name)
          console.log(gig.moneyIn)
          return gig
        })


        user.categories = []

        // We pull the items out of the user object before returning to the client, because the access tokens are in it.
        const {items, transactions, ...userWithoutItems} = user

        console.log('user')
        console.log(user)

        db.PlaidCategory
        .find({})
        .then(dbPlaidCat => {

          // console.log(dbPlaidCat)
          // userWithoutItems.categories.concat(dbPlaidCat)

          dbPlaidCat.map(plaidCat => {
            userWithoutItems.categories.push({name: plaidCat.name});
          })
          console.log(userWithoutItems)

          // WWrite this shit to Redis
          res.json(userWithoutItems);
        }).catch(err => {console.log(err) ; return err})
        .catch(err => res.status(404).json({ msg: "We could not find your user", err: err }))
        .catch(err => {console.log(err) ; return err})
      }).catch(err => res.status(404).json({ msg: "We could not find your user", err: err }))
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
    console.log('adding items and accounts to the user')
    db.User
      .findOneAndUpdate({ "auth_id": data.user.sub }, 
      { $push: { "items": 
        { "access_token": data.item.ACCESS_TOKEN, "item_id": data.item.ITEM_ID } } 
      }, 
      { upsert: true }
    )
    .then(dbUser => {
      // We are going to get the plaid promise and the personal gig promise in parellel here
      const plaidPromise = axios.post('https://sandbox.plaid.com/accounts/get', {
        client_id: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET,
        access_token: data.item.ACCESS_TOKEN
      })

      const personalGigPromise =  db.Gig.findOne({ name: 'Personal' }).lean()

      return Promise.all([ plaidPromise, personalGigPromise ])
        .then(data => [...data, dbUser])
    })
    // destructure the accounts out of the plaid response and return
    .then( ( [plaidResponse, personalGigResponse, dbUser ] = data ) =>  {
      const { data: { accounts } } = plaidResponse
      return [ accounts, personalGigResponse, dbUser ]
    })
    .then( ( [accounts, personalGig, dbUser] = data ) => {
      console.log('dbUser')
      console.log(dbUser)
      console.log('accounts')
      console.log(accounts)
      console.log('personalGig')
      console.log(personalGig)
      // whenever we save an account, we initialize the personal Gig as the default gig
      // we are going to create 1 to n accounts here, they are not dependent, so let's do it in parellel
      const createAccountPromises = accounts
        .map(account => {
          account.defaultGigId = personalGig._id
          return account
        })
        .map(account => db.Account.create(account))
      
      return Promise.all(createAccountPromises)
        .then(dbAccounts => {
          const updateUserPromises = dbAccounts.map(dbAccount => db.User.findOneAndUpdate({_id: dbUser._id }, 
                        { $push: { accounts: dbAccount._id } }, 
                        { new: true })
          )
          return Promise.all(updateUserPromises)
        })
      })
      .then( dbusers => res.status(201).json( { msg: 'sucessfully added accounts to user', user: user } ) )
      .catch( err => { console.log(err); return err} )
      .catch( err => res.status(500).json( { msg: 'Could not sucessfully add accouts to user', err: err } ) )
      
  },

  // all gigs need to be associated with a user
  addGigToUser: (req, res) => {
    console.log("add a gig to current user")
    db.Gig.create(req.body)
      .then(dbGig => {
        db.User.findOneAndUpdate({ "auth_id": req.params.authId }, 
        { $push: { gigs: dbGig._id } }, 
          { new: true })
        .then(dbUser => dbGig)
        return dbGig
      })
      .then(dbGig => {
        // We allow users to create gigs regardless if they associate them with an account
        if(req.body.account_id){
          db.Account.findOneAndUpdate({ "_id": req.body.account_id }, 
          { defaultGigId: dbGig._id })
          .then(dbAccount => dbAccount)
        }
        return dbGig
        })   
        .then(dbGig => res.json({msg: "Created a gig great job homey"}))
        .catch(err => res.status(500).json({ msg: "We were unable to create a gig", err: err } ) )
  },

  getTransactions: (req, res) => {

    db.User
      .findOne({
        "auth_id": req.body.sub
      })
      .then((dbUser) => {

        // Pull transactions for the Item for the last 30 days
        const startDate = getThreeYearsAgoFromToday() //moment().subtract(30, 'days').format('YYYY-MM-DD');
        const endDate = getToday() //moment().format('YYYY-MM-DD');

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
  },

  getCategories: (req, res) => {
    console.log('lets get those user categories shall we')
    db.User.findOne({ auth_id: req.params.authId }).lean()
      .populate('categories')
      .then(user => {
        const {categories} = user
        db.PlaidCategory.find().lean()
          .then(plaidCategories => {
            const allCategories = [...categories, ...plaidCategories]
            res.json(allCategories)
          })
      })
  },
  
  createCategory: (req, res) => {
    console.log('lets create a user category')
    db.Category.create({name: req.body.name})
    .then(dbCategory => {
      db.User.findOneAndUpdate({ "auth_id": req.params.authId },
      {$push: {categories: dbCategory._id}})
      .then(dbUser => res.status(201).json(dbUser))
      .catch(err => res.status(404).json({msg: "You were not able to create an category", err: err}))
    })
  },
  
  getAccounts: (req, res) => {
    console.log('lets get those user accounts shall we')
    db.User.findOne({ auth_id: req.params.authId }).lean()
      .populate('accounts')
      .then(user => {
            const {accounts} = user
            res.json(accounts)
      }).catch(err => res.status(404).json({msg: "Did not get accounts, sorry atari!", err: err}))
  },

  getGigs: (req, res) => {
    console.log('lets get those user gigs shall we')
    const user = db.User.findOne({ auth_id: req.params.authId }).lean()
    .populate('gigs')
    .populate({
      path: 'gigs',
      populate: {
        path: 'goals',
        model: 'Goal'
      }
      })
      .then(user => {

        const {gigs} = user
        const spendingByGigCategoryPromises = gigs.map(gig => spendingByCategoryGig(gig._id))
        const spendingByGigVendorPromises = gigs.map(gig => spendingByVendorGig(gig._id))
        const transactionsGigPromises = gigs.map(gig => transactionsGig(gig._id))
        const summaryGigPromises = gigs.map(gig => summaryGig(gig._id))

        let responseGigs =[]
        Promise.all(spendingByGigCategoryPromises)
          .then(spendingByCategory => {
            Promise.all(spendingByGigVendorPromises)
              .then(spendingByVendor => {
                Promise.all(transactionsGigPromises)
                  .then(transactions => {
                    Promise.all(summaryGigPromises)
                    .then(summary => {
                      responseGigs = gigs.map((gig, index) => {
                        gig.spendingByCategory = spendingByCategory[index]
                        gig.spendingByVendor = spendingByVendor[index]
                        gig.transactions = transactions[index]
                        gig.summary = summary[index]
                        console.log(spendingByCategory)
                        console.log(index)
                        console.log(gig)
                        return gig
                      })
                    res.json(responseGigs)
                  }).catch(err => res.status(404).json({msg: "Did not get gigs, sorry atari!", err: err}))
                }).catch(err => res.status(404).json({msg: "Did not get gigs, sorry atari!", err: err}))
              }).catch(err => res.status(404).json({msg: "Did not get gigs, sorry atari!", err: err}))
          }).catch(err => res.status(404).json({msg: "Did not get gigs, sorry atari!", err: err}))
      }).catch(err => res.status(404).json({msg: "Did not get gigs, sorry atari!", err: err}))
      .catch(err => res.status(404).json({msg: "Did not get gigs, sorry atari!", err: err}))
  }
  
}

