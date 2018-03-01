const express   = require('express');
const League  = require('../models/league');
const router    = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const robin = require('roundrobin')
const Team = require('../models/team')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.get('/myLeagues', function(req, res, next) {
  League
    // Retrieve all existing leagues
    .find({})
    .populate('_creator')
    .exec((err, leagues) => {
      res.render('user/user-home', { leagues });
    });
});
//