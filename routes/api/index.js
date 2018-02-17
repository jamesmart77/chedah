const router = require("express").Router();
const plaidRoutes = require("./plaid");

// Plaid routes
router.use("/plaid", plaidRoutes);

module.exports = router;
