const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('mongoose-unique-validator');


// temp account schema
const accountSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    accountType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

// add validator plugin
accountSchema.plugin(validator);

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
