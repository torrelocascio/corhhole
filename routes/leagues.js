const express   = require('express');

const router    = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const robin = require('roundrobin')
const Team = require('../models/team')
const League  = require('../models/league');

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
  //

// Display Form to Create League
router.get('/newleague', (req, res) => {
    if (ensureLoggedIn){
        res.render('leagues/new')
    } else {
        res.redirect('/login')
    }
});

// Handle Create League Form Submission
router.post('/newleague', ensureLoggedIn('/login'), (req, res, next) => {

    //create loop to generated new teams based on length of DOM
    // const newTeam = new Team ({
    //     teamName : req.body.teamName[0]

    // });
console.log("im here")
    const newLeague = new League({
        leagueName: req.body.leagueName
      

    
    });
    // newLeague.save((err) => {
    //     if (err) {
    //         res.render('leagues/new', { league: newLeague});
    //     } else {
    //         res.redirect(`/leagues/${newLeague._id}`);
    //     }

        newLeague.save((err) => {
        if (err) {
            console.log("err is:", err);
            res.render('leagues/new', { league: newLeague});
        } else {
            res.redirect(`/leagues/${newLeague._id}/process`)
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
router.get('/leagues/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
    
    League.findById(req.params.id, (err, league) => {
        if (err)        { return next(err) }
        if (!league)  { return next(new Error("404")) }
        return res.render('leagues/edit', {league})
    });
});

//Finalize League, Generate Schedule

router.post('/leagues/:id', ensureLoggedIn('/login'), (req, res, next) => {
   var updates
    League.findById(req.params.id, function (err, league) { 
        var updates = {
            schedule: robin(league.teams.length, league.teams)
        };
        console.log(updates);
        League.findByIdAndUpdate(req.params.id, updates, (err, league) => {
            if (err) {
                return res.render('leagues/edit', {
                    league,
                    errors: league.errors
                });
            }
            if (!league) {
                return next(new Error('404'));
            }
            return res.redirect(`/leagues/${league._id}`);
        });
    });


    
});
// Handle Edit League Form Submission
// Need Update: enter in schedule/game updates
router.post('/leagues/:id/update', ensureLoggedIn('/login'), (req, res, next) => {
    const updates = {
        leagueName: req.body.leagueName,
        description: req.body.description
    };

    League.findByIdAndUpdate(req.params.id, updates, (err, league) => {
        if (err) {
            return res.render('leagues/edit', {
                league,
                errors: league.errors
            });
        }
        if (!league) {
            return next(new Error('404'));
        }
        return res.redirect(`/leagues/${league._id}`);
    });
});

//Delete League
router.post('/:id/delete', (req, res, next) => {
    const id = req.params.id;
  
    League.findByIdAndRemove(id, (err, product) => {
      if (err){ return next(err); }
      return res.redirect('/leagues');
    });
  
  });

// delete

router.post('/')

//Route for League Creation In Process/Add Teams

router.get('/leagues/:leagueId/process', (req, res, next) => {
    
    let leagueId = req.params.leagueId;
    League.findById(leagueId, (err, league) => {
     if (err) {next(err); }   
        res.render('leagues/newTeam', {league: league})
    })
});


//Post of New Team Request - Need to Find League by ID, and then
//push teamName field into NEW TEAM

router.post('/leagues/:leagueId/process', ensureLoggedIn('/login'), (req, res, next) => {
    let leagueId = req.params.leagueId
    
    League.findById(leagueId, (err, league) => {
        const newTeam = new Team({
            teamName: req.body.teamName

        })
        console.log("Here is the leagueId",leagueId)
        console.log("LOOK HERE!!!!!!!!!!!!!!!!!",league)
        league.teams.push(newTeam);

        league.save((err) => {
            if (err) {return next(err);}
            res.redirect(`/leagues/${league._id}/process`)
        })
    })

    
})

    // League.findByIdAndUpdate(req.params.id, newTeam, (err, team) => {
    //     if (err) {
    //         return res.render('leagues/edit', {
    //             team,
    //             errors: team.errors
    //         });
    //     }
    //     if (!team) {
    //         return next(new Error('404'));
    //     }
    //     return res.redirect(`/leagues/${league._id}/process`);
    // });

    





module.exports = router;