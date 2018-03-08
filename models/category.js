const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('mongoose-unique-validator');

// schema for a category object
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    aliases: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }]
})

// add validator plugin
categorySchema.plugin(validator);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
