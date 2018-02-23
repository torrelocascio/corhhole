var express = require('express');
var router = express.Router();
const Campaign = require('../models/campaign');

/* GET home page. */
router.get('/', function(req, res, next) {
  Campaign
    // Retrieve all existing campaigns
    .find({})
    .populate('_creator')
    .exec((err, campaigns) => {
      res.render('index', { campaigns });
    });
});

module.exports = router;
