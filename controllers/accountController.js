const db = require('../models')

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
      .catch(err => res.status(404).json({err: err, msg: 'never gonna get it'}))
  },

  findById: (req, res) => {
    console.log(`-> looking for a account...`)
    db.User.findOne({ auth_id: req.body.userId }).lean()
      .populate('accounts')
      .then(dbUser => {
        const {accounts} = dbUser
        const account = accounts.find(account => account.account_id === req.params.id)
        console.log(account)
        res.json(account)
      })
      .catch(err => res.status(404).json({err: err, msg: 'never gonna get it'}))
  },

  update: (req, res) => {
    console.log(`-> updating an account...`)
    const udpates = {}
    db.Account.findOneAndUpdate({_id: req.params.id}, updates)
      .then(dbAccount => res.json(dbAccount))
      .catch(err => res.status(404).json({err: err, msg: 'never gonna get it'}))
  },

  delete: (req, res) => {
    console.log(`-> deleting an account...`)
    db.Account.findOneAndRemove({account_id: req.params.id})
      .then(dbAccount => res.json(dbAccount))
      .catch(err => res.status(404).json({err: err, msg: 'never gonna get it'}))
  }


}
