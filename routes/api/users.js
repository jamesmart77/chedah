const router = require("express").Router();
const userControllers = require("../../controllers/userController");
const plaidControllers = require("../../controllers/plaidController");

// Matches with "/api/plaid/get_access_token"
router.route("/")
  .get(userControllers.getUser)
  .post(userControllers.createUserIfDoesNotExist);

  router.route("/items")
  .post(plaidControllers.getPrivateKey);

  router.route("/transactions")
  .post(userControllers.getTransactions);

module.exports = router;
