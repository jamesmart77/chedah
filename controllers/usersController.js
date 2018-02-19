const db = require("../models");

// Defining methods for the booksController
module.exports = {
    createUser: (user) =>{
        db.User.create(user)
        .then((err,res) => {if(err) throw err; res.send(200)})
        .catch(err => err)
    }  
};
