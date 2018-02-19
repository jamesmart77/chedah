const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const jwtAuth = require('./jwtAuth');

router.all("/api", jwtAuth, (req, res, next) => {
  console.log('Successful authentication');
  next();
})
// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  console.log("BLAH!")
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
