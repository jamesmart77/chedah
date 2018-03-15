const db = require('../models')

module.exports = {

  // create a new category
  createCategory: category => db.Category.create(category),

  // add a new category and set default to false
  create: (req, res) => {
    console.log('creating a category')
    db.Category
      .create({name: req.body.name})
      .then(dbCat => {
        db.User.findOneAndUpdate({auth_id: req.body.userId},
          {
            $push: {
              categories: dbCat._id
            }
          }, {
            new: true
          }).then(dbUser => res.json(dbUser))
          .catch(err => { console.log(err); res.status(422).json(err) })
      }).catch(err => { console.log(err); res.status(422).json(err) })
  }
}
