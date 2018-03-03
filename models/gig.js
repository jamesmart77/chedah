const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('mongoose-unique-validator');


// schema for a gig object
const gigSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    }
});

// add validator plugin
gigSchema.plugin(validator);

const Gig = mongoose.model("Gig", gigSchema);
module.exports = Gig;
