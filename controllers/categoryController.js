const db    = require('../models');

module.exports = {

    // find all categories
    findAll: (req, res) => {
      db.Category
        .find(req.query)
        .sort({ date: -1 })
        .then(dbcat => res.json(dbcat))
        .catch(err => res.status(422).json(err));
    },

    // create a new category
    createCategory: category => db.Category.create(category),

    // add a new category and set default to false
    addCategory: (req, res) => {
      const Category = {
        name: req.query.name,
        description: req.query.desc || null,
        default: false
      }

      db.Category
        .create(Category)
        .then(dbcat => {
          res.json(dbcat);
         })
        .catch(err => {
          res.status(422).json(err);
        });
    },

    //  update an existing category
    updateCategory: (req, res) => {
      db.Category
        .findOneAndUpdate({
          _id: req.query.id
        }, req.body)
        .then(dbcat => {
          res.json(dbcat)
        })
        .catch(err => {
          res.status(422).json(err)
        });
    },

    // remove a category
    removeCategory: (req, res) => {
      db.Category
        .findById({
          _id: req.query.id
        })
        .then(dbcat => {
          dbcat.remove()
        })
        .then(dbcat => {
          res.json(dbcat)
        })
        .catch(err => {
          res.status(422).json(err)
        });
    },

    findCategoryById: (req, res) => {
      db.Category
        .findById({
          _id: req.query.id
        })
        .then(dbcat => {
          res.json(dbcat)
        })
        .catch(err => {
          res.status(422).json(err);
        });
    },

    findCategoryByName: (req, res) => {
      // console.log(`-> looking for name: ${req.query.name}`);
      db.Category
        .findOne({
          name:  req.query.name
        })
        .then(dbcat => {
          res.json(dbcat)
        })
        .catch(err => {
          res.status(422).json(err);
        });
    },
};
