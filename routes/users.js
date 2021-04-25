const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users/index');
});


// router.put('/', function (req, res, next) {
//   console.log("Hitting put functions".white);
//   console.log(req.body);
// });

// router.post('/upload', function (req, res, next) {
//   console.log("Hitting post functions".white);
//   console.log(req.body);
// });

module.exports = router;
