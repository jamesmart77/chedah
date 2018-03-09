const db    = require('../models');

module.exports = {

    // find all accounts
    findAll: (req, res) => {
      console.log(`-> looking for accounts...`)
      db.User.findOne({ auth_id: req.body.userId }).lean()
        .populate('accounts')
        .then(dbUser => {
          const {accounts} = dbUser
          console.log(accounts)
          res.status(200).json(accounts)
        })
        .catch(err => res.status(404).json({err: err, msg: "never gonna get it"}))
    },

    findById: (req, res) => {
      console.log(`-> looking for account...`)
      db.User.findOne({ auth_id: req.body.userId }).lean()
        .populate('accounts')
        .then(dbUser => {
          const {accounts} = dbUser
          const account = accounts.find( account => account.account_id === req.params.id)
          console.log(account)
          res.json(account)
        })
        .catch(err => res.status(404).json({err: err, msg: "never gonna get it"}))
    },

    update: (req, res) => {
      const udpates = {}
      db.Account.findOneAndUpdate({_id: req.body.accountId}, updates)
      .then(dbAccount => res.json(dbAccount))
      .catch(err => res.status(404).json({err: err, msg: "never gonna get it"}))
    },

    delete: (req, res) => {
      console.log(`-> looking for account...`)
      db.Account.findOneAndRemove({_id: req.body.accountId})
        .then(dbAccount => {
          res.json(dbAccount)
        })
        .catch(err => res.status(404).json({err: err, msg: "never gonna get it"}))
    }

     
};
