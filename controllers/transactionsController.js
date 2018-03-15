const db = require('../models')

module.exports = {

    // Update a transactions gig
    updateTransactionGig: (req, res) => {
        console.log(req.body)
        db.Transaction.findOneAndUpdate({_id: req.params.id}, {gigId: req.body.gigId})
            .then( dbTrans => res.status(200).json({msg: "This isn't your first rodeo is it? Good job updating that transaction"}))
            .catch( err => res.json({msg: "better luck next time, transaction NOT successfully updated", err: err}))
    },


    // Update transaction (all)
    updateTransaction: (req, res) => {
        console.log(`💀 hold onto your butts: `, req.body)
        db.Transaction.findOneAndUpdate({_id: req.params.id}, req.body)
            .then( dbTrans => res.status(200).json({msg: "This isn't your first rodeo is it? Good job updating that transaction"}))
            .catch( err => res.json({msg: "better luck next time, transaction NOT successfully updated", err: err}))
    }
}
