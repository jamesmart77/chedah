const router = require("express").Router();
const plaidController = require("../../controllers/plaidController");

// Matches with "/api/plaid/get_access_token"
router.route("/get_access_token")
  .post(plaidController.getPrivateKey);

router.route("/transactions/get")
  .post(plaidController.getTransactions);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
