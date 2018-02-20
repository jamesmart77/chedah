const router = require("express").Router();
const plaidRoutes = require("./plaid");
const authRoutes = require("./auth");
const transactionRoutes = require("./transactions");

// Plaid routes
router.use("/plaid", plaidRoutes);
router.use("/auth", authRoutes);
router.use("/transactions", transactionRoutes);

module.exports = router;
