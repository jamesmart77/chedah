const db = require('../models')

module.exports = {

  // create a new category
  createCategory: category => db.Category.create(category),

  // add a new category and set default to false
  create: (req, res) => {
    db.Category
      .create({name: req.body.name})
      .then(dbcat => {
        db.User.findOneAndUpdate({auth_id: req.body.authId})
          .then(dbUser => res.json(dbUser)
        )
      }).catch(err => res.status(422).json(err))
      .catch(err => res.status(422).json(err))
  }
}
