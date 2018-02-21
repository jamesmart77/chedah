const router = require("express").Router();
const userControllers = require("../../controllers/userController");

// Matches with "/api/plaid/get_access_token"
router.route("/")
  .post(userControllers.createUserIfDoesNotExist);

  router.route("/items")
  .post(userControllers.addItemToUser);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
