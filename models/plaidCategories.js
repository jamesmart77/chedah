const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema for a category object
const plaidCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const plaidCategory = mongoose.model('plaidCategory', plaidCategorySchema)
module.exports = plaidCategory
