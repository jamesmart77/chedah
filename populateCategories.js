/*
Marc, if youre reading this, something has gone terribly wrong ;)

JK, bc we are the fantastic 5 we thought this through and are staticly storing the Plaid defaults until we can smartly GET and store categories
without any mult-user interferance. God speed.
*/

const db = require('./models')
const plaid = require('plaid')
const R = require('ramda')
require('dotenv').config()
const mongoose = require('mongoose')

// Set up promises with mongoose
mongoose.Promise = global.Promise
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/chedah',
  {
    useMongoClient: true
  }
)

var client = new plaid.Client(
  process.env.PLAID_CLIENT_ID, // these values need to be updated and stored in a .env
  process.env.PLAID_SECRET, // these values need to be updated and stored in a .env
  process.env.PLAID_PUBLIC_KEY, // these values need to be updated and stored in a .env
  plaid.environments.sandbox
)

client.getCategories(function (err, response) {
  if (err) console.log(err)
  const categories = response.categories
  const chedahCategories = R.uniq(categories.map(category => category.hierarchy[1] ? category.hierarchy[1] : category.hierarchy[0]))

  R.last(chedahCategories) === 'undefined' ? chedahCategories.pop() : chedahCategories

  // console.log(R.last(chedahCategories))

  db.PlaidCategory.remove({})

  const x = chedahCategories.map(catName => { return {'name': catName} })

  console.log(x)
  db.PlaidCategory.create(x)
    .then(results => console.log(results))
    .catch(err => console.log(err))
})
