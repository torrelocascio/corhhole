var express = require('express');
var router = express.Router();
const League = require('../models/league');

/* GET home page. */
router.get('/', function(req, res, next) {
  League
    // Retrieve all existing leagues
    .find({})
    .populate('_creator')
    .exec((err, leagues) => {
      res.render('index', { leagues });
    });
});

module.exports = router;
