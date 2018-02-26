const express   = require('express');
const League  = require('../models/league');
const router    = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');

//User Home
router.get('/myLeagues', function(req, res, next) {
    League
      // Retrieve all existing leagues
      .find({})
      .populate('_creator')
      .exec((err, leagues) => {
        res.render('user/user-home', { leagues });
      });
  });
  

// Display Form to Create League
router.get('/new', (req, res) => {
    if (ensureLoggedIn){res.render('leagues/new')} else {res.redirect('/login')}
});

// Handle Create League Form Submission
router.post('/new', ensureLoggedIn('/login'), (req, res, next) => {
    const newLeague = new League({
        leagueName: req.body.leagueName,
        description: req.body.description,
        // This will throw an error is there's no
        // User to associate the campaign with
        _creator: req.user._id
    });

    newLeague.save((err) => {
        if (err) {
            res.render('leagues/new', { league: newLeague});
        } else {
            res.redirect(`/leagues/${newLeague._id}`);
        }
    }); 
});

// Show Individual League
router.get('/leagues/:id', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        if (err) { return next(err) }

        league.populate('_creator', (err, league) => {
            if (err) { return next(err) }
            return res.render('leagues/show', { league });
        });
    });
});

// Display Edit League Form
router.get('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        if (err)        { return next(err) }
        if (!league)  { return next(new Error("404")) }
        return res.render('leagues/edit')
    });
});

// Handle Edit League Form Submission
//Need Update: enter in schedule/game updates
// router.post('/:id', ensureLoggedIn('/login'), (req, res, next) => {
//     const updates = {
//         leagueName: req.body.leagueName,
//         description: req.body.description,
//     };

//     League.findByIdAndUpdate(req.params.id, updates, (err, league) => {
//         if (err) {
//             return res.render('leagues/edit', {
//                 league,
//                 errors: league.errors
//             });
//         }
//         if (!league) {
//             return next(new Error('404'));
//         }
//         return res.redirect(`/leagues/${league._id}`);
//     });
// });

module.exports = router;