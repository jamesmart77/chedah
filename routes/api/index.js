const router = require("express").Router();
// const bookRoutes = require("./books");
const plaidRoutes = require("./plaid");

// Book routes
// router.use("/books", bookRoutes);
router.use("/plaid", plaidRoutes);

module.exports = router;
