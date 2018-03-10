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
      console.log("Creating a goal and adding it to a gig")
      const goal = {}
      goal.name = req.body.name
      goal.budget = req.body.budget
      goal.description = req.body.description
      const categories = req.body.categories

      db.Goal.create(goal)
        .then(dbGoal => {
          dbGoal.categories.push(categories)
          dbGoal.save();
          console.log('dbGoal._id')
          console.log(dbGoal._id)
          console.log('gigId')
          console.log(req.body.gigId)
          db.Gig
          .findOneAndUpdate({_id: req.body.gigId}, 
            {$push : {
              goals: dbGoal._id
            }}
          )
          .then(dbGoal => res.json(dbGoal))
          .catch(err => res.status(422).json(err));
        })

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
