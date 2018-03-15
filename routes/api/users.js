const router = require('express').Router()
const userControllers = require('../../controllers/userController')
const plaidControllers = require('../../controllers/plaidController')
client = require("redis").createClient(process.env.REDISCLOUD_URL, "", {
  no_ready_check: true
});

client.on("connect", () =>{
  console.log("Redis Connection made")
});

const cacheCheck = (req,res, next) => {
  console.log("Cache checked")
  const userFetch = req.params.authId;
  console.log(`This is the ${userFetch}`)
  client.get(userFetch, (err, data)=>{
    if(err) throw err;

    if(data != null){
      res.json(data)
    }else{
      next();
    }
  })
}



// Matches with "/api/plaid/get_access_token"
router.route('/')
  .post(userControllers.createUserIfDoesNotExist)

router.route('/items')
  .post(plaidControllers.getPrivateKey)

router.route('/:authId')
  .get(cacheCheck, userControllers.getUser)

router.route('/transactions')
  .post(userControllers.getTransactions)

router.route('/:authId/categories')
  .post(userControllers.getCategories)

router.route('/:authId/categories/create')
  .post(userControllers.createCategory)

router.route('/:authId/accounts')
  .post(userControllers.getAccounts)

router.route('/:authId/gigs')
  .post(userControllers.addGigToUser)

router.route('/:authId/gigs/get')
  .post(userControllers.getGigs)

module.exports = router;