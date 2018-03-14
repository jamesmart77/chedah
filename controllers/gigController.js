const db = require('../models')

module.exports = {

  // find all gigs
  findAll: (req, res) => {
    console.log(`-> looking for gigs...`)
    db.Gig
      .find(req.query)
      .sort({ date: -1 })
      .then(dbgig => res.json(dbgig))
      .catch(err => res.status(422).json(err))
  },

  // create a new gig
  createGig: gig => db.Gig.create(gig),

  // add a goal to a gig
  addGoalToGig: (req, res) => {
    console.log(req.body)
    const goal = {
      name: req.body.goalName,
      budget: req.body.goalBudget
    }

    const categories = ['travel', 'gas', 'tolls', 'advertising']

    db.Goal.create(goal)
      .then(dbGoal => {
        return db.Goal.findOneAndUpdate({_id: dbGoal._id}, {
          $set: {
            categories: categories
          }
        })
          .then(dbGoal => {
            db.Gig.findOneAndUpdate({_id: req.params.id}
              , {
                $push: {
                  goals: dbGoal._id
                }
              }, {
                new: true
              })
              .then(dbGig => res.json(dbGig))
              .catch(err => {
                console.log(err)
                res.json(err)})
          })
      })
  },

  // add a new gig and set default to false
  // check if we can deprecate -bb
  addGig: (req, res) => {
    db.Gig
      .create({name: req.body.name, description: req.body.description})
      .then(dbGig => {
        db.User.findOneAndUpdate({'auth_id': req.body.userId},
          {$push: { gigs: dbGig._id }})
          .then(dbUser => {
            res.json(dbUser)})
          .catch(err => {
            res.status(422).json(err)})
      }).catch(err => {
      res.status(422).json(err)})
  },

  //  update an existing gig
  update: (req, res) => {
    console.log(`-> Updating a gig...`)
    db.Gig
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbgig => {
        res.json(dbgig)})
      .catch(err => {
        res.status(422).json(err)})
  },

  // remove a gig
  remove: (req, res) => {
    console.log(`-> looking for a gig...`)
    db.Gig.findById({ _id: req.query.id })
      .then(dbgig => {
        dbgig.remove()})
      .then(dbgig => {
        res.json(dbgig)})
      .catch(err => {
        res.status(422).json(err)})
  },

  findById: (req, res) => {
    console.log(`-> looking for a gig...`)

    const gig = db.Gig.findOne({ account_id: req.params.id }).lean()
    const transactions = db.Transaction.find({gigId: req.params.id}).lean()

    const aggregateGigCategories = db.Transaction.aggregate([
      { $match: { gigId: req.params.id } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: {total: -1} }
    ])
    const aggregateGigVendors = db.Transaction.aggregate([
      { $match: { gigId: req.params.id } },
      { $group: { _id: '$transactionName', total: { $sum: '$amount' } } },
      { $sort: {total: -1} }
    ])

    Promise.all([gig, aggregateGigCategories, aggregateGigVendors, transactions])
      .then(data => {
        const [account, spendingByCategory, spendingByVendor, transactions] = data
        const response = {}
        response.summary = gig
        response.spendingByCategory = spendingByCategory
        response.spendingByVendor = spendingByVendor
        response.transactions = transactions
        res.json(response)
      })
      .catch(err => res.status(404).json({err: err, msg: 'never gonna get it'}))
  },

  addGigToAccount: (req, res) => {
    console.log('add gig to account')
    db.Gig.create({name: req.body.name})
      .then(dbGig => {
        db.Account.findByIdAndUpdate({_id: req.body.accountId},
          {defaultGigId: dbGig._id}
        ).then(dbAccount => {
          res.json(dbAccount)
        }).catch(err => res.status(500).json({msg: 'Did not create a gig and add it to an account', err: err}))
      }).catch(err => res.status(500).json({msg: 'Did not create a gig and add it to an account', err: err}))
  },

  delete: (req, res) => {
    console.log('GIG CONTROLLER: Delete gig and disassociate account')
    db.Gig.findByIdAndRemove({_id: req.params.id})
      .then(dbGig => {
        db.Gig.findOne({name: 'Personal'})
          .then(dbGig => {
            console.log('dbGig: ', req.params.id)
            console.log('dbPersonalGig: ', dbGig)
            console.log('dbPersonalGig._id: ', dbGig._id)
            db.Account.findOneAndUpdate({defaultGigId: req.params.id}, {defaultGigId: dbGig._id})
            .then(dbAccount => res.status(200).json({msg: "Succcessfully deleted the gig, and updated the association in accounts"}))
      }).catch(err => res.status(500).json({msg: "Could not delete the gig", err: err}))
    }).catch(err => res.status(500).json({msg: "Could not delete the gig", err: err}))
  }

}
