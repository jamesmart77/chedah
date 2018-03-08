const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('mongoose-unique-validator');

// schema for a category object
const plaidCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

// add validator plugin
plaidCategorySchema.plugin(validator);

const plaidCategory = mongoose.model('plaidCategory', plaidCategorySchema);
module.exports = plaidCategory;
