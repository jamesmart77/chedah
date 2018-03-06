const db    = require('../models');

module.exports = {

    // find all goals
    findAll: (req, res) => {
      db.Goal
        .find(req.query)
        .then(dbgoal => res.json(dbgoal))
        .catch(err => res.status(422).json(err));
    },

    // add a new goal
    addGoal: (req, res) => {

      console.log(req.body)

      db.Goal.findByIdAndUpdate({_id: req.body.gigId},
        {
          $addToSet: {
            goals: req.body.goal
          }
        })
        .then(dbModal => res.json(dbModal))
        .catch(err => {
          res.status(422).json(err);
        });
    },

    //  update an existing goal
    updateGoal: (req, res) => {
      db.Goal
        .findOneAndUpdate({
          _id: req.query.id
        }, req.body)
        .then(dbgoal => {
          res.json(dbgoal)
        })
        .catch(err => {
          res.status(422).json(err)
        });
    },

    // remove a goal
    removeGoal: (req, res) => {
      db.Goal
        .findById({
          _id: req.query.id
        })
        .then(dbgoal => {
          dbgoal.remove()
        })
        .then(dbgoal => {
          res.json(dbgoal)
        })
        .catch(err => {
          res.status(422).json(err)
        });
    },

    findGoalById: (req, res) => {
      // console.log(`-> looking for id: ${req.query.id}`);
      db.Goal
        .findById({
          _id: req.query.id
        })
        .then(dbgoal => {
          res.json(dbgoal)
        })
        .catch(err => {
          res.status(422).json(err);
        });
    },

    findGoalByName: (req, res) => {
      // console.log(`-> looking for name: ${req.query.name}`);
      db.Goal
        .findOne({
          name:  req.query.name
        })
        .then(dbgoal => {
          res.json(dbgoal)
        })
        .catch(err => {
          res.status(422).json(err);
        });
    },
};
