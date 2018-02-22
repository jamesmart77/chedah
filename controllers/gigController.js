const db    = require('../models');


module.exports = {

    // add a new gig
    addGig: (req, res) => {
        const gig = {
            name: req.body.name,
            description: req.body.description || null,
            accountID: req.body.accountID || null
        }

        db.Gig
            .create(gig)
                .then(dbgig => {
                    res.json(dbgig));
            })
                .catch(err => {
                    res.status(422).json(err));
            });
    },

    //  update an existing gig
    updateGig: (req, res) => {
      db.Gig
        .findOneAndUpdate({
            _id: req.params.id
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
            _id: req.params.id
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
      db.Gig
        .findById(req.params.id)
        .then(dbgig => {
            res.json(dbgig)
        })
        .catch(err => {
            res.status(422).json(err);
        });
    },

    findGigByName: (req, res) => {
      db.Gig
        .findOne({
            name:  req.body.name
        })
        .then(dbgig => {
            res.json(dbgig)
        })
        .catch(err => {
            res.status(422).json(err);
        });
    },
};
