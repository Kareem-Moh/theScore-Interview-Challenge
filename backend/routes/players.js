var express = require('express');
var router = express.Router();

/* GET players listing. */
router.get('/', function(req, res, next) {
  res.send('Connected to Express!');
});

module.exports = router;
