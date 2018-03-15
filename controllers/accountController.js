const db = require('../models')

module.exports = {

  // find all accounts
  findAll: (req, res) => {
    console.log(`-> looking for accounts...`)
    db.User.findOne({ auth_id: req.body.userId }).lean()
      .populate('accounts')
      .then({accounts} = dbUser => res.status(200).json(accounts))
      .catch(err => res.status(404).json({err: err, msg: 'never gonna get it'}))
  },

  findById: (req, res) => {
    console.log(`-> looking for a account...`)

    const account = db.Account.findOne({ account_id: req.params.id }).lean()

    const aggregateAccountCategories = db.Transaction.aggregate([
      { $match: { account_id: req.params.id } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: {total: -1} }
    ])

    const aggregateAccountVendors = db.Transaction.aggregate([
      { $match: { account_id: req.params.id } },
      { $group: { _id: '$transactionName', total: { $sum: '$amount' } } },
      { $sort: {total: -1} }
    ])

    const transactions = db.Transaction.find({account_id: req.params.id}).lean()

    Promise.all([account, aggregateAccountCategories, aggregateAccountVendors, transactions])
      .then(data => {
        const [account, spendingByCategory, spendingByVendor, transactions] = data
        const response = {}
        response.summary = account
        response.spendingByCategory = spendingByCategory
        response.spendingByVendor = spendingByVendor
        response.transactions = transactions
        res.json(response)
      })
      .catch(err => res.status(404).json({ err: err, msg: 'Not able to find an account by id' }))
  },

  update: (req, res) => {
    console.log(`-> updating an account...`)
    console.log('req.body: ', req.body)
    db.Account.findOneAndUpdate({_id: req.params.id}, req.body)
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
