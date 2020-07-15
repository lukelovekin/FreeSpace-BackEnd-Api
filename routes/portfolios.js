var express = require('express');
var router = express.Router();
// const mongoose = require('mongoose')

const portfolios = [
  {name: "hey"}
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(portfolios);
});

module.exports = router;
