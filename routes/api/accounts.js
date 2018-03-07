const router = require("express").Router();
const accountsController = require("../../controllers/accountsController");

router.route("/:id")
    .post(accountsController.addAccountAndGig);


module.exports = router;
