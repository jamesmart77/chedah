const db    = require('../models');

module.exports = {

    // find all gigs
    findAll: (req, res) => {
      console.log(`-> looking for gigs...`);
      db.Gig
        .find(req.query)
        .sort({ date: -1 })
        .then(dbgig => res.json(dbgig))
        .catch(err => res.status(422).json(err));
    },

    // create a new gig
    createGig: gig => db.Gig.create(gig),

    // add a new gig and set default to false
    addGig: (req, res) => {
      
      const gig = {
        name: req.query.name,
        default: false
      }

      db.Gig
        .create(gig)
        .then(dbgig => {
          res.json(dbgig);
         })
        .catch(err => {
          res.status(422).json(err);
        });
    },

    //  update an existing gig
    updateGig: (req, res) => {
      db.Gig
        .findOneAndUpdate({
          _id: req.query.id
        }, req.body)
        .then(dbgig => {
          res.json(dbgig)
        })
        .catch(err => {
          res.status(422).json(err)
        });
    },

    // remove a gig
    removeGig: (req, res) => {
      db.Gig
        .findById({
          _id: req.query.id
        })
        .then(dbgig => {
          dbgig.remove()
        })
        .then(dbgig => {
          res.json(dbgig)
        })
        .catch(err => {
          res.status(422).json(err)
        });
    },

    findGigById: (req, res) => {
      // console.log(`-> looking for id: ${req.query.id}`);
      db.Gig
        .findById({
          _id: req.query.id
        })
        .then(dbgig => {
          res.json(dbgig)
        })
        .catch(err => {
          res.status(422).json(err);
        });
    },

    findGigByName: (req, res) => {
      // console.log(`-> looking for name: ${req.query.name}`);
      db.Gig
        .findOne({
          name:  req.query.name
        })
        .then(dbgig => {
          res.json(dbgig)
        })
        .catch(err => {
          res.status(422).json(err);
        });
    },
};
