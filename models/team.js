const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const teamSchema = new Schema({
    teamName        :  {type: String, required: true },
    wins            : {type: Number, default: 0},
    losses          : {type: Number, default: 0}

});

const Team  = mongoose.model('Team', teamSchema);
module.exports = Team