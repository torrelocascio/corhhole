const express   = require('express');
const League  = require('../models/league');
const router    = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const robin = require('roundrobin')
const Team = require('../models/team')