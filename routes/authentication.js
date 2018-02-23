const express = require('express');
const passport = require('passport');
const router = express.Router();

// Display Signup Form
router.get('/signup', (req, res) => {
    res.render('authentication/signup');
});

// Handle Submission of Signup Form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect     : '/',
    failureRedirect     : '/signup'
}));

module.exports = router;