const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const teamSchema = new Schema({
    teamName        :  {type: String, required: true },
    player1Name     : {type: String},   
    player2Name     : {type: String},

});

const Team  = mongoose.model('Team', teamSchema);
module.exports = Team