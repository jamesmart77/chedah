const router = require("express").Router();
const userControllers = require("../../controllers/userController");

// Matches with "/api/plaid/get_access_token"
router.route("/")
  .post(userControllers.createUserIfDoesNotExist);

  router.route("/items")
  .post(userControllers.addItemToUser);

  router.route("/transactions")
  .post(userControllers.getTransactions);

module.exports = router;
