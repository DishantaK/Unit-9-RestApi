var express = require('express');
var router = express.Router();


/* GET API Home */
router.get('/', function(req, res, next) {
  res.redirect("/api")
});



module.exports = router;


