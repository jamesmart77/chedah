const router = require("express").Router();
const plaidRoutes = require("./plaid");
const authRoutes = require("./auth");

// Plaid routes
router.use("/plaid", plaidRoutes);
router.use("/auth", authRoutes);

module.exports = router;
