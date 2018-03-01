const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const Team = require('./team');

const teamSchema = new Schema({
    _id        :  {type: String, required: True},
    team1            : Team.schema,
    team2         : Team.schema,

});

const Team  = mongoose.model('Team', teamSchema);
module.exports = Team