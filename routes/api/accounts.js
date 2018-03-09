const router = require("express").Router();
const accountController = require("../../controllers/accountController");
/*
router.route("/:id")
    .post(accountController.addAccountAndGig);
*/

router.get('/accounts/:id?', accountController.findAccountById)

module.exports = router;
