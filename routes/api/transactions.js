const router = require("express").Router();
const plaidController = require("../../controllers/plaidController");

// Matches with "/api/transactions"
router.route("/account/:id")
  .post(plaidController.getTransactionsByAccount);
module.exports = router;
