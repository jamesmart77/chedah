const router = require("express").Router();
const transactions = require("./transactions");
const plaidRoutes = require("./plaid");
const users = require("./users");
const authRoutes = require("./auth");

// Plaid routes
router.use("/plaid", plaidRoutes);
router.use("/transactions", transactions);
router.use("/users", users);
router.use("/auth", authRoutes);

module.exports = router;
