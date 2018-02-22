const mongoose  = require("mongoose");
const Schema    = mongoose.Schema;


// schema for a gig object
const gigSchema = new Schema({
    name: {
        type: String,
        required: true
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


const Gig = mongoose.model("Gig", gigSchema);

module.exports = Gig;
