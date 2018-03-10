const db = require("./models");
const plaid = require("plaid");
const R = require("ramda");
require("dotenv").config();
const mongoose = require("mongoose");

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chedah", {
  useMongoClient: true
});

const aggregateAccountCategories = db.Transaction.aggregate([
  { $match: { account_id: "RmKbP4d6PWudGwXl91AxCPjEvgEEqpfMvzXeJ" } },
  { $group: { _id: "$category", total: { $sum: "$amount" } } }
]);

const aggregateAccountVendors = db.Transaction.aggregate([
  { $match: { account_id: "RmKbP4d6PWudGwXl91AxCPjEvgEEqpfMvzXeJ" } },
  { $group: { _id: "$transactionName", total: { $sum: "$amount" } } }
]);

const aggregateGigCategories = db.Transaction.aggregate([
  { $match: { gigId: '5aa1bb8b6b7126f2f5314126' } },
  { $group: { _id: "$category", total: { $sum: "$amount" } } }
]);

const aggregateGigVendors = db.Transaction.aggregate([
  { $match: { gigId: '5aa1bb8b6b7126f2f5314126' } },
  { $group: { _id: "$transactionName", total: { $sum: "$amount" } } }
]);

// const user =   db.User.findOne({ auth_id: req.params.authId }).lean()
const user = db.User.findOne({ auth_id: "facebook|10155456253012712" })
  .lean()
  .populate("accounts")
  .populate("transactions")
  .populate("gigs")
  .populate("categories")
  .populate({
    path: "gigs",
    populate: {
      path: "goals",
      model: "Goal"
    }
  });

const categories = db.Category.find().lean();

Promise.all([
  user,
  categories,
  aggregateAccountCategories,
  aggregateAccountVendors,
  aggregateGigCategories,
  aggregateGigVendors
])
  .then(console.log)
  .catch(console.log);