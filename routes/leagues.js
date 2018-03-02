const express   = require('express');

const router    = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const robin = require('roundrobin')
const Team = require('../models/team')
const League  = require('../models/league');
const Game  = require('../models/game');

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
            schedule: robin(league.teams.length, league.teams),
            // something: robin(league.teams.length, league.teams).forEach(game =>{
            //     console.log("FIRST ROW", game)
            //     game.forEach(onePair=>{
            //         console.log("second ROW", pairs)
            //         games.pairs.push(onePair)
            //     })
            // })
        };
        // console.log(updates);
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

// router.get('/leagues/:id/updateResults', (req, res, next) => {
//     leagueId = req.params.id;
//     League.findById(leagueId, (err, theLeague) => {
//         if(err){
//             next(err);
//             return;
//         }
//         res.render('leagues/updateResults', {
//             league: theLeague
//         })
//     })

// })

// router.post('/leagues/:id/:id/:id', (req, res, next) => {
//     console.log("im inside!!!!")
//     leagueId = req.params.id;


//     // teamId1 = req.body.input[1].id
//     // teamId2 = req.body.input[i].id
//     League.findById(leagueId, (err, theLeague) => {
//         if(err){
//             console.log()
//             next(err);
//             return;
//         }


        // })
        // theLeague.schedule.forEach(pairs => {
        //     console.log("This is pairs 00",pairs[0][0])
    //         pairs[0][0].forEach(oneTeam => {
    //             console.log("this is oneTeam", oneTeam)
    // console.log("This is oneTeam._id",oneTeam._id)

    //         })

                // console.log("onePair", onePair)
                // console.log("This is my OPNEPAIR that I'm pushing:", onePair[0]._id)
                // const onePairId = onePair[0]._id;
                // console.log("onePairId ====== ", one)
                // if(req.body.Team1Win){
                    // console.log("req.body.Team1Win", req.body.Team1Win)
        
                    // Team.findById(pairs[0][0]._id, (err, theTeam) => {
                    //     if(err){
                    //         next(err);
                    //         return;
                    //     }
                    //     theTeam.wins= theTeam.wins +1
                    //     theTeam.save((err) => {
                    //         if(err){
                    //             next(err);
                    //             return;
                    //         } 

                    //         //==========
                    //         theLeague.save((err) => {
                    //             if(err){
                    //                 next(err);
                    //                 return;
                    //             }
                    //             // console.log("This is my league after saving:", theLeague)
                    
                    //         })
                    //         // =========
                    // //     })
                    //     console.log("the team after saving: ", theTeam)
                    //     console.log("======================")

//                     })
//                 // }
       
//         res.redirect(`/leagues/${theLeague._id}`)
//     // })
// });



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

//Post for Adding a Winner and Loser
// router.post('/leagues/:leagueId/:teamId1/:teamId2/submitGame', ensureLoggedIn('/login'), (req, res, next) => {
//     let leagueId = req.params.leagueId
//     let teamId1 = req.params.teamId1
//     let teamId2 = req.params.teamId2
//     //If the first button = true, add win to first team and loss to second team
//     Team.findById(teamId1, (err, team) => {
//         team.wins = team.wins + 1
//         team.save((err) => {
//             if (err) {return next(err);}
//             res.redirect(`/leagues/${league._id}`)
//         })
//         Team.findById(teamId2, (err, team) => {
//             team.losses = team.losses+1
//             team.save((err) => {
//                 if (err) {return next(err);}
//                 res.redirect(`/leagues/${league._id}`)
//             })
//         })
//     })

// //if the second button is selected

// Team.findById(teamId1, (err, team) => {

//     team.losses = team.losses + 1


//     team.save((err) => {
//         if (err) {return next(err);}
//         res.redirect(`/leagues/${league._id}`)
//     })

//     Team.findById(teamId2, (err, team) => {
//         team.wins = team.wins+1
//         team.save((err) => {
//             if (err) {return next(err);}
//             res.redirect(`/leagues/${league._id}`)
// })

    
// })

// })

// })




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