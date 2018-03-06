const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('mongoose-unique-validator')

// temp account schema
const accountSchema = new Schema({
  account_id: String,
  balances: {
    available: Number,
    current: Number,
    limit: Number
  },
  mask: String,
  name: String,
  official_name: String,
  subtype: String,
  type: String,
  defaultGigId: 'String' // looks like ObjectId("5a9ca22338684795f41262ea")
})

// add validator plugin
accountSchema.plugin(validator)

const Account = mongoose.model('Account', accountSchema)
module.exports = Account
