const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('mongoose-unique-validator');


// schema for a goal object
const goalSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    accountID: {
        type: String,
        required: false
    }
});

// add validator plugin
goalSchema.plugin(validator);

const Goal = mongoose.model("Gig", goalSchema);
module.exports = Goal;
