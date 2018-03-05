const router = require("express").Router();
const transactions = require("./transactions");
const plaidRoutes = require("./plaid");
const users = require("./users");
const gigs = require("./gigs");
const authRoutes = require("./auth");
const accountRoutes = require("./accounts")

// Plaid routes
router.use("/plaid", plaidRoutes);
router.use("/transactions", transactions);
router.use("/users", users);
router.use("/gigs", gigs);
router.use("/auth", authRoutes);
router.use("/accounts", accountRoutes)


module.exports = router;
