const router = require("express").Router();
const usersController = require("../../controllers/usersController ");

// Matches with "/api/books"
router.route("/user/new")
  .post(usersController.createUser)




module.exports = router;
