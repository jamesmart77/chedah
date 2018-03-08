const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('mongoose-unique-validator')

// schema for a Category object
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

// add validator plugin
categorySchema.plugin(validator)

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
