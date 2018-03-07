const redis = require("../redis/main")
const db = require("../models")


module.exports = {
    addAccountAndGig: (req, res) => {
        db.Account.findById(req.params.id).then(theUser => {
            redis.addEdit(theUser, {
                account: theUser,
                gigName: req.body.gigName
            }).then(() => {
                res.send("Sold");
                
            })
        })
       
    }
}