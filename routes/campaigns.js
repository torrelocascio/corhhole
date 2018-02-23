const express   = require('express');
const Campaign  = require('../models/campaign');
const TYPES     = require('../models/campaign-types');
const router    = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');

// Display Form to Create Campaign
router.get('/new', (req, res) => {
    res.render('campaigns/new', { types: TYPES });
});

// Handle Create Campaign Form Submission
router.post('/', ensureLoggedIn('/login'), (req, res, next) => {
    const newCampaign = new Campaign({
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
        category: req.body.category,
        deadline: req.body.deadline,

        // This will throw an error is there's no
        // User to associate the campaign with
        _creator: req.user._id
    });

    newCampaign.save((err) => {
        if (err) {
            res.render('campaigns/new', { campaign: newCampaign, types: TYPES });
        } else {
            res.redirect(`/campaigns/${newCampaign._id}`);
        }
    }); 
});

// Show Individual Routes
router.get('/:id', (req, res, next) => {
    Campaign.findById(req.params.id, (err, campaign) => {
        if (err) { return next(err) }

        campaign.populate('_creator', (err, campaign) => {
            if (err) { return next(err) }
            return res.render('campaigns/show', { campaign });
        });
    });
});

// Display Edit Campaign Form
router.get('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
    Campaign.findById(req.params.id, (err, campaign) => {
        if (err)        { return next(err) }
        if (!campaign)  { return next(new Error("404")) }
        return res.render('campaigns/edit', { campaign, types: TYPES })
    });
});

// Handle Edit Campaign Form Submission
router.post('/:id', ensureLoggedIn('/login'), (req, res, next) => {
    const updates = {
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
        category: req.body.category,
        deadline: req.body.deadline
    };

    Campaign.findByIdAndUpdate(req.params.id, updates, (err, campaign) => {
        if (err) {
            return res.render('campaigns/edit', {
                campaign,
                errors: campaign.errors
            });
        }
        if (!campaign) {
            return next(new Error('404'));
        }
        return res.redirect(`/campaigns/${campaign._id}`);
    });
});

module.exports = router;